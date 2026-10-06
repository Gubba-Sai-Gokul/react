import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import TextExpander from "./TextExpander.jsx";

createRoot(document.getElementById("root")).render(
  <App />
  // <>
  //   <TextExpander limit={20}>
  //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis optio
  //     cupiditate sint labore culpa ad eum voluptatibus amet facere. Nam, minus?
  //     Hic dolores modi voluptatem nesciunt natus odit nostrum sit necessitatibus
  //     ipsam fugiat iusto, reprehenderit nemo minus voluptas doloremque
  //     perferendis architecto placeat, cumque at quam! Unde repudiandae provident
  //     totam doloremque.
  //   </TextExpander>
  //   <TextExpander limit={30} textFontSize={20} toggleColor={"green"} toggleSize={14} expandText={"Expand Text"} collapseText={"Collapse Text"}>
  //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis optio
  //     cupiditate sint labore culpa ad eum voluptatibus amet facere. Nam, minus?
  //     Hic dolores modi voluptatem nesciunt natus odit nostrum sit necessitatibus
  //     ipsam fugiat iusto, reprehenderit nemo minus voluptas doloremque
  //     perferendis architecto placeat, cumque at quam! Unde repudiandae provident
  //     totam doloremque.
  //   </TextExpander>
  // </>
);
