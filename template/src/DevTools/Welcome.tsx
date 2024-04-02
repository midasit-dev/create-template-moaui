import {
  Panel,
  Typography,
  GuideBox,
  CodeBlock,
  Color,
} from "@midasit-dev/moaui";
import React from "react";
import { useTranslation } from "react-i18next";

const languageList = new Map([
  ["English", "en"],
  ["Korean", "ko"],
  ["Japanese", "ja"],
]);

const Welcome = () => {
  const { t: translate, i18n: internationalization } = useTranslation();
  const [language, setLanguage] = React.useState(
    window.location.pathname.split("/")[1]
  );

  function onChangeLangHandler(event: any) {
    setLanguage(event.target.value);
    window.location.pathname = `/${event.target.value}`;
    internationalization.changeLanguage(event.target.value);
  }

  return (
    <Panel
      width="100%"
      variant="shadow2"
      padding={2}
      border={`1px solid ${Color.secondary.main}`}
    >
      <GuideBox spacing={2}>
        <GuideBox row width="100%" horSpaceBetween verCenter>
          <Typography variant="h1">
            {translate("welcome_midas_plugin")}
          </Typography>
          <DropList
            width="auto"
            itemList={languageList}
            value={language}
            onChange={onChangeLangHandler}
          />
          <GuideBox pulse spacing={1}>
            💚💚💚
          </GuideBox>
        </GuideBox>
        <GuideBox spacing={0.7}>
          <Typography>{translate("dev_mode_developing")}</Typography>
          <Typography>{translate("turn_on_development_mode")}</Typography>
          <Typography>{translate("type_command_below")}</Typography>
        </GuideBox>
        <CodeBlock language="markdown" title="in terminal" radius={0}>
          {`npm run dev`}
        </CodeBlock>
      </GuideBox>
    </Panel>
  );
};

export default Welcome;
