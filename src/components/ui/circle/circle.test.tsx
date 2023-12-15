import { Circle } from "./circle";
import TestRenderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

const renderAndMatchSnapshot = (component: any) => {
  const tree = TestRenderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

describe("Проверка Circle", () => {
  const testCases = [
    { desc: "Circle empty", props: {} },
    { desc: "Circle with content", props: { letter: "Букв" } },
    { desc: "Circle with head", props: { head: "777" } },
    {
      desc: "Circle small head",
      props: { head: <Circle isSmall={true} /> },
    },
    { desc: "Circle with tail", props: { tail: "777" } },
    {
      desc: "Circle small tail",
      props: { tail: <Circle isSmall={true} /> },
    },
    { desc: "Circle with index", props: { index: 777 } },
    { desc: "Circle small === true", props: { isSmall: true } },
    {
      desc: "Circle with default state",
      props: { state: ElementStates.Default },
    },
    {
      desc: "Circle with changing state",
      props: { state: ElementStates.Changing },
    },
    {
      desc: "Circle with modified state",
      props: { state: ElementStates.Modified },
    },
  ];

  testCases.forEach(({ desc, props }) => {
    it(desc, () => {
      renderAndMatchSnapshot(<Circle {...props} />);
    });
  });
});
