import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { AiFillMoon } from "react-icons/ai";
import { AiFillSun } from "react-icons/ai";

export const Darkmode = () =>{

    
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLight = computedColorScheme == "light";

    return (
      <ActionIcon
        onClick={() => setColorScheme(isLight ? "dark" : "light")}
        variant="default"
        size="xl"
        radius="md"
        aria-label="Toggle color scheme"
      >
        {isLight ?<AiFillMoon />  :  <AiFillSun />}
      </ActionIcon>
    );
}