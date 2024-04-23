import { useState } from "react";
import { GuideBox, Panel, MidasController } from "@midasit-dev/moaui";
import { default as ToolsHome } from "./PanelRight";
import { AnimatePresence, motion } from "framer-motion";

const App = (props: any) => {
  const {
    children,
    title,
    setTitle,
    containerSize,
    setContainerSize,
    bgColor,
    setBgColor,
  } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <GuideBox show width="100%" row fill="#f5f6f7">
          <GuideBox flexGrow={1} center height="100vh">
            <div id="container">
              <Panel
                variant="shadow2"
                padding={0}
                borderRadius="4px"
                border="1px solid #a7a777a"
              >
                <GuideBox width="auto">
                  <MidasController
                    icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}
                    title={title}
                  />
                  {children}
                </GuideBox>
              </Panel>
            </div>
          </GuideBox>

          <motion.div
            className="fixed top-[24px] right-[24px] w-auto h-auto"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.div
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: 350 },
              }}
            >
              <Panel
                variant="box"
                backgroundColor="#fff"
                padding={0}
                borderRadius="4px"
                border="1px solid #d1d1d1"
              >
                <GuideBox width={350} padding={2}>
                  <GuideBox width="100%">
                    <ToolsHome
                      titleState={[title, setTitle]}
                      containerSizeState={[containerSize, setContainerSize]}
                      bgColorState={[bgColor, setBgColor]}
                    />
                  </GuideBox>
                </GuideBox>
              </Panel>
            </motion.div>

            <motion.div className="fixed bottom-[24px] right-[24px]">
              <motion.div
                className="w-10 h-10 cursor-pointer"
                variants={{
                  open: { rotate: 0 },
                  closed: { rotate: 180 },
                }}
                onClick={() => setOpen(!isOpen)}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
              >
                <SvgMinimize />
              </motion.div>
            </motion.div>
          </motion.div>
        </GuideBox>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;

const SvgMinimize = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#353a3e"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
