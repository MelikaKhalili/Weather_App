import "animate.css";
import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import "./WelcomeMassage.css";

export default function WelcomeMassage() {
  const drag2Ref = useRef(null);
  const [rotateTriggered, setRotateTriggered] = useState(false);
  const [name, setName] = useState("");
  const [x, setX] = useState(false);
  useEffect(() => {
    const drag2Element = drag2Ref.current;
    if (!drag2Element) return;

    if (!x) {
      anime({
        targets: ".drag",
        translateY: [
          { value: "-50vh", duration: 0 },
          { value: "0", duration: 2000, easing: "easeOutQuad" },
        ],
        complete: () => {
          const contentElement = document.querySelector(".content");
          if (contentElement) contentElement.classList.add("visible");
          setX(true);
        },
      });
    }

    anime({
      targets: ".drga2",
      translateY: [
        { value: "50vh", duration: 0 },
        { value: "0", duration: 2000, easing: "easeOutQuad" },
      ],
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            anime({
              targets: drag2Element,
              opacity: 0,
              duration: 1000,
              easing: "easeOutQuad",
              complete: () => {
                anime({
                  targets: ".drag",
                  rotate: "120deg",
                  duration: 800,
                  easing: "easeInOutQuad",
                  complete: () => {
                    const dragContent = document.querySelector(".drag-content");
                    if (dragContent) dragContent.classList.add("visible");

                    anime({
                      targets: ".custom-shape",
                      opacity: 1,
                      scale: [0.2, 1],
                      duration: 0,
                      delay: 200,
                      easing: "easeOutQuad",
                      complete: () => {
                        const h1Element = document.querySelector(".drag h1");
                        if (h1Element) h1Element.classList.add("visible");

                        if (rotateTriggered) {
                          anime({
                            targets: ".drag",
                            rotate: "-120deg",
                            opacity: 0,
                            duration: 800,
                            easing: "easeInOutQuad",
                            delay: 3000,
                            complete: () => {
                              const dragElement =
                                document.querySelector(".drag");
                              if (dragElement)
                                dragElement.style.visibility = "hidden";

                              const customShape3 =
                                document.querySelector(".custom-shape3");
                              if (customShape3) {
                                customShape3.classList.remove("hidden");
                                anime({
                                  targets: ".custom-shape3",
                                  opacity: 1,
                                  scale: [0.3, 1],
                                  duration: 1000,
                                  easing: "easeOutQuad",
                                  complete: () => {
                                    anime({
                                      targets: ".custom-shape",
                                      translateX: "150px",
                                      duration: 500,
                                      easing: "easeOutQuad",
                                      complete: () => {
                                        anime({
                                          targets: ".custom-shape",
                                          translateX: "-80px",
                                          duration: 800,
                                          delay: 300,
                                          easing: "easeOutQuad",
                                        });
                                      },
                                    });

                                    anime({
                                      targets: ".custom-shape3",
                                      translateX: "150px",
                                      duration: 500,
                                      easing: "easeOutQuad",
                                      complete: () => {
                                        anime({
                                          targets: ".custom-shape3",
                                          translateX: "80px",
                                          duration: 800,
                                          delay: 300,
                                          easing: "easeOutQuad",
                                        });
                                      },
                                    });
                                  },
                                });
                              }
                            },
                          });
                        }
                      },
                    });
                  },
                });
              },
            });
            observer.unobserve(drag2Element);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(drag2Element);
  }, [rotateTriggered]);

  const handleSubmitClick = () => {
    setRotateTriggered(true);
    console.log("Hello");
  };

  return (
    <div className="bg-slate-950 w-full h-screen">
      <div className="z-1 translate-x-[6%] translate-y-[6%]  px-8 bg-slate-800 w-[90%] h-[600px] rounded-[30px] BackGround relative z-40 overflow-hidden">
        <div className="container">
          <div className="custom-shape"></div>
          <div className="custom-shape3 hidden"></div>
        </div>
        <div className="bg-slate-800 drag w-full h-[400px]">
          <div className="content flex gap-6 flex-col justify-center items-center">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <input type="text" />
            <input type="text" />
            <button
              onClick={handleSubmitClick}
              className="bg-blue-700 text-white py-2 px-6 rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
        <div
          ref={drag2Ref}
          className="bg-slate-800 drga2 w-full h-[400px]"
        ></div>
      </div>
    </div>
  );
}
