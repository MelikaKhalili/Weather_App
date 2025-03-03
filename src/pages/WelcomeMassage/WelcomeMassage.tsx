import "animate.css";
import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter, FaUserCircle } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TypeAnimation } from "react-type-animation";
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
                            delay: 500,
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
                                  opacity: 2,
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
                                          translateX: "-80px", // سمت چپ
                                          duration: 900,
                                          delay: 150,
                                          easing: "easeOutQuad",
                                        });
                                      },
                                    });
                                    anime({
                                      targets: ".custom-shape3",
                                      translateX: "-80px",
                                      duration: 900,
                                      easing: "easeOutQuad",
                                      complete: () => {
                                        anime({
                                          targets: ".custom-shape3",
                                          translateX: "80px",
                                          duration: 400,
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
      <div className="z-1 translate-x-[6%] translate-y-[6%] px-8 bg-slate-800 w-[90%] h-[600px] rounded-[30px] BackGround relative z-40 overflow-hidden">
        <div className="container">
          <div className="custom-shape"></div>
          <div className="custom-shape3">
            <div className="contentCustomShape no-rotate">
              <span className="text text-white absolute z-50">Sign In</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 drag w-full h-[400px]">
          <div className="content zoomIn  flex gap-8 flex-col justify-center items-center">
            <TypeAnimation
              className="text-white text-5xl font-bold "
              sequence={["Sign", 1000, "Up", 1000, "Sign Up", 5000, "", 700]}
              style={{ fontSize: "2em" }}
              repeat={Infinity}
            />
            <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
              <FaUserCircle className="text-gray-700 text-xl mr-2" />
              <input
                type="text"
                className="bg-transparent focus:outline-none placeholder-gray-700"
                placeholder="Please Enter Your Name"
              />
            </div>
            <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
              <MdOutlineMail className="text-gray-700 text-xl mr-2" />
              <input
                type="email"
                className="bg-transparent focus:outline-none placeholder-gray-700"
                placeholder="Please Enter Your Email"
              />
            </div>
            <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
              <IoLockClosed className="text-gray-700 text-xl mr-2" />
              <input
                type="password"
                className="bg-transparent focus:outline-none placeholder-gray-700"
                placeholder="Please Enter Your Password"
              />
            </div>
            {/* <button onClick={handleSubmitClick} className="btn-17">
              <span className="text-container">
                <span className="text">Sign Up</span>
              </span>
            </button> */}
            <button className="bg-red-500" onClick={handleSubmitClick}>
              Sign Up
            </button>
            <p className="text-white">
              You can register with your social platforms.
            </p>
            <div className="grid grid-cols-4 gap-6">
              <div className="border-2 border-white bg-white w-10 h-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-125">
                <FaFacebookF className="text-xl" />
              </div>
              <div className="border-2 border-white bg-white w-10 h-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-125">
                <FaTwitter />
              </div>
              <div className="border-2 border-white bg-white w-10 h-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-125">
                <FaGoogle />
              </div>
              <div className="border-2 border-white bg-white w-10 h-10 flex justify-center items-center rounded-full transition-transform duration-300 hover:scale-125">
                <TbBrandGithubFilled />
              </div>
            </div>
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
