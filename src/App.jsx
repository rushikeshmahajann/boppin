import { useState, useEffect, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import React from "react";
import { data } from "../data/data";
import ShoppingBag from "../icons/ShoppingBag";
import Love from "../icons/Love";
import Search from "../icons/Search";
import Cube from "../icons/Cube";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const lastDirectionRef = useRef(null);

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction, nameToDelete, index) => {
    lastDirectionRef.current = direction; //
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(
      `${name} (${idx}) went to ${lastDirectionRef.current}`,
      currentIndexRef.current
    );
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  return (
    <>
      <section className="w-full max-w-[500px] p-2.5 h-[100dvh] flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-3xl tracking-tight font-semibold bg-gradient-to-b from-pink-300 to-pink-600 bg-clip-text text-transparent flex gap-1 items-center">
            <div className="w-5 h-5 rounded-full bg-gradient-to-b from-pink-300 to-pink-600"></div>
            boppin'
          </h2>
          <div className="bg-neutral-100 w-12 h-12 rounded-full p-2 flex justify-center">
            <button className="stroke-gray-700 relative">
              <div className="rounded-full w-1.5 h-1.5 bg-pink-400 absolute top-1 right-0 flex justify-center items-center"></div>
              <ShoppingBag />
            </button>
          </div>
        </div>
        <div className="w-full h-max">
          <h2 className="font-mori text-gray-500 font-semibold text-xl tracking-tight mt-4">
            find your fit
          </h2>
        </div>
        {/* Card Functionality Start */}
        <div className="cardContainer absolute top-30">
          {data.map((article, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={article.id}
              onSwipe={(dir) => swiped(dir, article.name, index)}
              onCardLeftScreen={() => outOfFrame(article.name, index)}
            >
              <div className="card-vignette h-[73vh] w-full shadow-sm border-1 border-gray-100 rounded-xl mt-2 overflow-hidden relative">
                <div className="bg-transparent absolute z-999 w-full grid grid-cols-4 gap-2 px-3 py-3">
                  <div className="w-full bg-white rounded-lg h-1.5"></div>
                  <div className="w-full bg-white rounded-lg h-1.5"></div>
                  <div className="w-full bg-gray-300 rounded-lg h-1.5"></div>
                  <div className="w-full bg-gray-300 rounded-lg h-1.5"></div>
                </div>
                <img
                  className="object-cover w-full h-full"
                  src={article.imageUrl}
                  alt="image"
                />
                {/* Brand Name */}
                <div className="absolute z-999 px-2 top-8 left-1 text-white font-base">
                  <h4 className="text-base">{article.brand}</h4>
                </div>
                <div className="absolute px-2 bottom-10 z-999 text-white w-full">
                  <div className="flex flex-col items-start justify-between">
                    <div className="w-max flex flex-col justify-between items-start">
                      <p className="text-4xl font-base flex items-center gap-2">
                        ₹{article.price}{" "}
                        <span className="text-xs border-green-200 border-1 text-green-950 rounded-lg px-2 py-1 bg-green-100">
                          discount {article.discountPercentage}%
                        </span>
                      </p>
                      <span className="text-base text-gray-100">
                        original price: ₹{article.originalPrice}
                      </span>
                    </div>
                    <h2 className="text-xl max-w-xs font-base lowercase">
                      {article.name}
                    </h2>
                  </div>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        {/* Card Functionality End */}
        <footer className="bg-white w-full max-w-[500px] px-2.5 py-1.5 fixed bottom-0 h-max flex justify-between items-center">
          <div>
            <button className="stroke-gray-700 fill-none">
              <Search />
            </button>
          </div>
          <div>
            <button className="stroke-gray-700 fill-none">
              <Love />
            </button>
          </div>
          <div>
            <button className="stroke-gray-700 fill-none">
              <Cube />
            </button>
          </div>
          <div className="rounded-full w-10 h-10 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://i.pinimg.com/736x/b9/cc/68/b9cc6898268e077654e067e90c1e9d00.jpg"
              alt="pfp"
            />
          </div>
        </footer>
      </section>
      <TinderCard />
    </>
  );
}

export default App;
