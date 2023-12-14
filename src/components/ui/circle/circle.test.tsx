import { Circle } from "./circle";
import TestRenderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

const renderAndMatchSnapshot = (component: any) => {
  const tree = TestRenderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

describe("Проверка Circle", () => {
  const testCases = [
    { desc: "Circle без буквы", props: {} },
    { desc: "Circle с буквами", props: { letter: "Букв" } },
    { desc: "Circle с head", props: { head: "777" } },
    {
      desc: "Circle с react элементом в head",
      props: { head: <Circle isSmall={true} /> },
    },
    { desc: "Circle с tail", props: { tail: "777" } },
    {
      desc: "Circle с react элементом в tail",
      props: { tail: <Circle isSmall={true} /> },
    },
    { desc: "Circle с index", props: { index: 777 } },
    { desc: "Circle с пропсом isSmall ===  true", props: { isSmall: true } },
    {
      desc: "Circle в состоянии default",
      props: { state: ElementStates.Default },
    },
    {
      desc: "Circle в состоянии changing",
      props: { state: ElementStates.Changing },
    },
    {
      desc: "Circle в состоянии modified",
      props: { state: ElementStates.Modified },
    },
  ];

  testCases.forEach(({ desc, props }) => {
    it(desc, () => {
      renderAndMatchSnapshot(<Circle {...props} />);
    });
  });
});
