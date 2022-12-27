import { Routes, Route } from "react-router-dom";
import Home from "./general/Home";
import About from "./general/About";
import MultilevelMenu from "./structure/MultilevelMenu";
import { menuData } from "./menuItems";

const AppMenu = () => {
  return (
    <div className="App">
      <MultilevelMenu data={menuData} />
      <Routes>
        <Route index element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<About />} />
        <Route path="web-design" element={<About />} />
        <Route path="web-dev" element={<About />} />
        <Route path="frontend" element={<About />} />
        <Route path="node" element={<About />} />
        <Route path="seo" element={<About />} />
        <Route path="php" element={<About />} />
        <Route path="who-we-are" element={<About />} />
        <Route path="our-values" element={<About />} />
        <Route path="*" element={<p>Not found!</p>} />
      </Routes>
    </div>
  );
};

export default AppMenu;
