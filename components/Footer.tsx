"use client";
import React from "react";

const image0104 = "/assets/image0104.webp";
const image0105 = "/assets/image0105.webp";
const youtb = "/assets/youtb.webp";
const ml = "/assets/ml.webp";

export default function Footer() {
  // const footer = (
  //   <>
  //     <footer id="text11" className="foter">
  //       <span className="footer01sp">
  //         <a
  //           className="loadicon010101"
  //           href="https://www.facebook.com/FouadBechar2"
  //           target="_parent"
  //         >
  //           <img
  //             className="img321"
  //             src={image0104}
  //             alt="image0102"
  //             width="30px"
  //             height="30px"
  //           />
  //         </a>
  //         <a
  //           className="loadicon010101"
  //           href="https://x.com/FouadBechar"
  //           target="_parent"
  //         >
  //           <img
  //             className="im0im1"
  //             src={image0105}
  //             alt="image0105"
  //             width="30px"
  //             height="30px"
  //           />
  //         </a>
  //         <a
  //           className="loadicon010101"
  //           href="https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA"
  //           target="_parent"
  //         >
  //           <img
  //             className="im0im2"
  //             src={youtb}
  //             alt="image0105"
  //             width="43px"
  //             height="30px"
  //           />
  //         </a>
  //         <img id="open-btn" src={ml} alt="email" width="30px" height="30px" />
  //       </span>
  //       <div className="pr0101">
  //         <a href="/privacy/" target="_parent">
  //           Privacy Policy
  //         </a>
  //       </div>
  //     </footer>
  //   </>
  // );

  return (
    // <footer id="text11" className="foter">
    // { footer }
    // </footer>

    <footer id="text11" className="foter">
      <span className="footer01sp">
        <a
          className="loadicon010101"
          href="https://www.facebook.com/FouadBechar2"
          target="_parent"
        >
          <img
            className="img321"
            src={image0104}
            alt="image0102"
            width="30px"
            height="30px"
          />
        </a>
        <a
          className="loadicon010101"
          href="https://x.com/FouadBechar"
          target="_parent"
        >
          <img
            className="im0im1"
            src={image0105}
            alt="image0105"
            width="30px"
            height="30px"
          />
        </a>
        <a
          className="loadicon010101"
          href="https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA"
          target="_parent"
        >
          <img
            className="im0im2"
            src={youtb}
            alt="image0105"
            width="43px"
            height="30px"
          />
        </a>
        <img id="open-btn" src={ml} alt="email" width="30px" height="30px" />
      </span>
      <div className="pr0101">
        <a href="/privacy/" target="_parent">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
