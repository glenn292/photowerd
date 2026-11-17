import TemplateList from "../section/Template/temp";
import { useEffect } from "react";
import { scrollToTop } from "../utils/scroll";

export default function Template() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <TemplateList />
    </div>
  );
}
