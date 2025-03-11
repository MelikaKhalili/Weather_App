import "animate.css";
import anime from "animejs/lib/anime.es.js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaGoogle, FaTwitter, FaUserCircle } from "react-icons/fa";
import { GrSun } from "react-icons/gr";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "./WelcomeMassage.css";

export default function WelcomeMassage() {
  const drag2Ref = useRef(null);
  const navigate = useNavigate();
  const [rotateTriggered, setRotateTriggered] = useState(false);
  const [x, setX] = useState(false);
  const [isLoading, setIsLoadin] = useState(false);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Errors:
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const handleSubmitClick = async () => {
    let isValid = true;

    // بررسی نام
    if (!name.trim()) {
      setNameError("کاربر گرامی لطفا نام خود را وارد کنید");
      isValid = false;
    } else {
      setNameError("");
    }

    // بررسی ایمیل
    if (!email.trim()) {
      setEmailError("کاربر گرامی لطفا ایمیل خود را وارد نمایید");
      isValid = false;
    } else {
      setEmailError("");
    }

    // بررسی پسورد
    if (!password.trim()) {
      setPassWordError("کاربر گرامی لطفا پسوورد خود را وارد نمایید");
      isValid = false;
    } else {
      setPassWordError("");
    }

    // اگر هیچ کدام از فیلدها پر نشده باشد، از اجرای تابع جلوگیری می‌کنیم.
    if (!isValid) return;

    // ذخیره اطلاعات در localStorage
    localStorage.setItem("UserName", name);
    localStorage.setItem("UserEmail", email);
    localStorage.setItem("UserPassword", password);

    try {
      const response = await axios.post(
        "https://67607fab6be7889dc35e25cb.mockapi.io/weatherApp",
        {
          userName: name,
          userEmail: email,
          userPassword: password,
        }
      );

      const data = response.data;
      console.log(data);

      if (response.data.id) {
        toast.success("از اینجا به بعد، ما کنارتیم🥰");
        setRotateTriggered(true);
        setTimeout(() => {
          setRotateTriggered(true);
        }, 2000);
      } else {
        alert("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      alert("خطا در برقراری ارتباط با سرور.");
      console.error(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [nameInput, setNameInput] = useState<any>("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameErrorLogin, setNameErrorLogin] = useState("");
  const [passwordErrorLogin, setPassWordErrorLogin] = useState("");
  const handelGoToHomePage = () => {
    let isValid = true;
    const storedName = localStorage.getItem("UserName");
    const storedPassword = localStorage.getItem("UserPassword");
    if (!nameInput.trim()) {
      setNameErrorLogin(
        "کاربر گرامی شما ملزم به پر کردن  نام کاربری خود هستید"
      );
      isValid = false;
    } else {
      setNameErrorLogin("");
    }
    if (!passwordInput.trim()) {
      setPassWordErrorLogin("کاربر گرامی رمز خود را وارد نمایید");
      isValid = false;
    } else {
      setPassWordErrorLogin("");
    }
    if (!isValid) return;
    if (name === storedName && password === storedPassword) {
      setIsLoadin(true);
      setTimeout(() => {
        toast.success("به آپ خودتون خوش اومدید");
        navigate("/home");
      }, 7000);
    } else {
      toast.error("❌متاسفانه نمیتونین وارد به آپ بشین");
    }
  };
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

                              // حذف کلاس hidden از custom-shape3 و fixed-content
                              const customShape3 =
                                document.querySelector(".custom-shape3");
                              const fixedContent =
                                document.querySelector(".fixed-content");
                              if (customShape3)
                                customShape3.classList.remove("hidden");
                              if (fixedContent)
                                fixedContent.classList.remove("hidden");

                              // اجرای انیمیشن نمایان شدن custom-shape3
                              anime({
                                targets: ".custom-shape3",
                                opacity: 1,
                                scale: [0.3, 1],
                                duration: 1000,
                                easing: "easeOutQuad",
                                complete: () => {
                                  // ادامه انیمیشن‌های translateX برای custom-shape و custom-shape3
                                  anime({
                                    targets: ".custom-shape",
                                    translateX: "150px",
                                    duration: 500,
                                    easing: "easeOutQuad",
                                    complete: () => {
                                      anime({
                                        targets: ".custom-shape",
                                        translateX: "-80px",
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
  const toggleBackground = () => {
    setBgColor((prev) => (prev === "#1e293b" ? "#3b82f6" : "#1e293b"));
  };
  return (
    <div className="bg-slate-950 w-full h-screen">
      {isLoading && (
        <div className="fixed z-[99999999999] w-full h-screen bg-black/60 backdrop-blur-lg rounded-xl shadow-xl flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      <div
        style={{ backgroundColor: bgColor }}
        className="z-1 translate-x-[6%] translate-y-[6%] px-8  w-[90%] h-[600px] rounded-[30px] BackGround relative z-40 overflow-hidden"
      >
        <div className="absolute right-8 top-8 z-[999999999999999999999999999999999999]">
          <div
            onClick={toggleBackground}
            className="bg-slate-300 w-[43px] h-[43px] rounded-full flex justify-center items-center"
          >
            <GrSun className="text-2xl text-white" />
          </div>
        </div>
        <div className="container relative">
          <div className="custom-shape"></div>
          <div
            className="custom-shape3 rotating-background hidden "
            style={{ pointerEvents: "none" }}
          ></div>
          <div className="fixed-content absolute inset-0 flex items-center justify-center pointer-events-auto hidden ">
            <div className="p-4 flex gap-6 flex-col justify-center items-center absolute top-[25%] right-72 z-[999999999]">
              <h1 className="font-bold text-4xl text-white ">Sign In</h1>
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center bg-[#dce8f2] rounded-3xl px-10 py-3">
                  <FaUserCircle className="text-gray-700 text-xl mr-2" />
                  <input
                    type="text"
                    className="bg-transparent focus:outline-none placeholder-gray-700"
                    placeholder="Please Enter Your Name"
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>
                {nameErrorLogin && (
                  <p className="text-red-500 text-[10px]">{nameErrorLogin}</p>
                )}
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center bg-[#dce8f2] rounded-3xl px-10 py-3">
                  <IoLockClosed className="text-gray-700 text-xl mr-2" />
                  <input
                    className="bg-transparent focus:outline-none placeholder-gray-700"
                    placeholder="Please Enter Your Password"
                    type="text"
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>
                {passwordErrorLogin && (
                  <p className="text-red-500 text-[10px]">
                    {passwordErrorLogin}
                  </p>
                )}
              </div>
              <button
                onClick={handelGoToHomePage}
                className="text-white bg-blue-700 rounded-full py-2 px-8 font-bold shadow-lg"
              >
                LogIn
              </button>
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
        </div>

        {/* سایر بخش‌های فرم */}
        <div
          style={{ backgroundColor: bgColor }}
          className="drag w-full h-[400px]"
        >
          <div className="content zoomIn flex gap-8 flex-col justify-center items-center">
            <TypeAnimation
              className="text-white text-5xl font-bold"
              sequence={["Sign", 1000, "Up", 1000, "Sign Up", 5000, "", 700]}
              style={{ fontSize: "2em" }}
              repeat={Infinity}
            />
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
                <FaUserCircle className="text-gray-700 text-xl mr-2" />
                <input
                  type="text"
                  className="bg-transparent focus:outline-none placeholder-gray-700"
                  placeholder="Please Enter Your Name"
                  onChange={(e) => SetName(e.target.value)}
                />
              </div>
              {nameError && (
                <p className="text-red-500 text-[10px]">{nameError}</p>
              )}
            </div>
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
                <MdOutlineMail className="text-gray-700 text-xl mr-2" />
                <input
                  type="email"
                  className="bg-transparent focus:outline-none placeholder-gray-700"
                  placeholder="Please Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-[10px]">{emailError}</p>
              )}
            </div>
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="flex items-center bg-[#dce8f2] rounded-3xl px-8 py-3">
                <IoLockClosed className="text-gray-700 text-xl mr-2" />
                <input
                  type="password"
                  className="bg-transparent focus:outline-none placeholder-gray-700"
                  placeholder="Please Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-[10px]">{passwordError}</p>
              )}
            </div>
            <button
              className="bg-blue-700 py-2 px-8 rounded-full text-white font-bold text-md z-[10001] shadow-lg"
              onClick={handleSubmitClick}
            >
              Sign Up
            </button>
            <a href="#" className="text-white">
              You can register with your social platforms.
            </a>
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
          style={{ backgroundColor: bgColor }}
          ref={drag2Ref}
          className=" drga2 w-full h-[400px]"
        ></div>
      </div>
    </div>
  );
}
