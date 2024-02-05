import React from 'react';
import {
  GuideBox,
  Icon,
  IconButton,
  TextFieldV2,
  Panel,
  Tooltip,
} from '@midasit-dev/moaui';
import { useBoxes } from './useBoxes';
import { useController } from './useController';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LayoutBoxState, LayoutSchemaState } from '../recoilState';

const App = () => {
	const [boxes, setBoxes] = useRecoilState(LayoutBoxState);
	const schemas = useRecoilValue(LayoutSchemaState);

  const {
    initialize: initializeInputs,
    x, handleChangeX,
    y, handleChangeY,
    width, handleChangeWidth,
    height, handleChangeHeight,
    spacing, handleChangeSpacing,
		getInputs,
  } = useController();

	const {
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
		createNewBox,
	} = useBoxes({initializeInputs});

	// shortcut
	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		//input
		if (e.altKey && e.key === 'r') initializeInputs();

		//button
		if (e.altKey && e.key === 'Enter') handleClickAddBox('default', getInputs());
		if (e.altKey && e.key === 'ArrowLeft') handleClickAddBox('left', getInputs());
		if (e.altKey && e.key === 'ArrowRight') handleClickAddBox('right', getInputs());
		if (e.altKey && e.key === 'ArrowUp') handleClickAddBox('top', getInputs());
		if (e.altKey && e.key === 'ArrowDown') handleClickAddBox('bottom', getInputs());
		if (e.altKey && e.key === 'Backspace') handleClickPrevDelete();
		if (e.altKey && e.key === 'Delete') handleClickDelAllBoxes();
	};

	React.useEffect(() => {
		console.log('render?');
		//schemas가 초기에 값이 []인데, 채워져 있으면 실행한다.
		const newBoxes = [];
		for (const schema of schemas) {
			newBoxes.push(createNewBox(schema.id, {
				x: schema.x,
				y: schema.y,
				width: schema.width,
				height: schema.height,
				spacing: 0,
			}));
		}

		setBoxes(newBoxes);
	}, [createNewBox, schemas, setBoxes]);

  return (
    <GuideBox row width="100%">
      <div
        className='wrapper-box'
        style={{
          width: '100%',
          height: 'calc(100vh - 32px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
      >
        {boxes.map((box) => box.element)}
      </div>
      <GuideBox row>
				<pre style={{ fontSize: '12px' }}>{JSON.stringify(boxes, null, 2)}</pre>
        <pre style={{ fontSize: '12px' }}>{JSON.stringify(schemas, null, 2)}</pre>
      </GuideBox>
      <div tabIndex={1} onKeyDown={handleOnKeyDown}>
        <Panel variant="shadow2" padding={2} marginLeft={2}>
          <GuideBox row spacing={2}>
            <GuideBox width="100%" spacing={2} horRight>
              <GuideBox width="100%" spacing={2}>
                <GuideBox width='100%' spacing={1}>
                  <TextFieldV2
                    title="x"
                    onChange={handleChangeX}
                    numberOptions={{ onlyInteger: true, min: 0 }}
                    type="number"
                    value={x.toString()}
                  />
                  <TextFieldV2
                    title="y"
                    onChange={handleChangeY}
                    numberOptions={{ onlyInteger: true, min: 0 }}
                    type="number"
                    value={y.toString()}
                  />
                  <TextFieldV2
                    title="width"
                    onChange={handleChangeWidth}
                    numberOptions={{ onlyInteger: true, min: 0 }}
                    type="number"
                    value={width.toString()}
                  />
                  <TextFieldV2
                    title="height"
                    onChange={handleChangeHeight}
                    numberOptions={{ onlyInteger: true, min: 0 }}
                    type="number"
                    value={height.toString()}
                  />
                  <GuideBox width="100%" horRight borderRadius={1}>
                    <Tooltip title="refresh Alt + r">
                      <IconButton color='negative' onClick={() => initializeInputs()}>
                        <Icon iconName='Refresh' />
                      </IconButton>
                    </Tooltip>
                  </GuideBox>
                </GuideBox>
              </GuideBox>
              <GuideBox show fill='#f1f1f1' width="100%" borderRadius={1} padding={1} border='1px solid #ddd' spacing={1}>
                <GuideBox width='100%' row horSpaceBetween verCenter>
                  <GuideBox>
                    <GuideBox row>
                      <div style={{ opacity: 0 }}>
                        <IconButton transparent disabled>
                          <Icon iconName="ExpandMore" />
                        </IconButton>
                      </div>
                      <Tooltip title="add top Alt + Up">
                        <IconButton transparent onClick={() => handleClickAddBox('top', getInputs())} color="negative">
                          <Icon iconName="ExpandLess" />
                        </IconButton>
                      </Tooltip>
                      <div style={{ opacity: 0 }}>
                        <IconButton transparent disabled>
                          <Icon iconName="ExpandMore" />
                        </IconButton>
                      </div>
                    </GuideBox>
                    <GuideBox row>
                      <Tooltip title="add left Alt + Left">
                        <IconButton transparent onClick={() => handleClickAddBox('left', getInputs())} color="negative">
                          <Icon iconName="NavigateBefore" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="add bottom Alt + Bottom">
                        <IconButton transparent onClick={() => handleClickAddBox('bottom', getInputs())} color="negative">
                          <Icon iconName="ExpandMore" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="add right Alt + Right">
                        <IconButton transparent onClick={() => handleClickAddBox('right', getInputs())} color="negative">
                          <Icon iconName="NavigateNext" />
                        </IconButton>
                      </Tooltip>
                    </GuideBox>
                  </GuideBox>
                  <GuideBox row>
                    <Tooltip title="add Alt + Enter">
                      <IconButton transparent onClick={() => handleClickAddBox('default', getInputs())} color='negative'>
                        <Icon iconName='Add' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="del Alt + Backspace">
                      <IconButton transparent onClick={handleClickPrevDelete}>
                        <Icon iconName="Clear" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="del all Alt + Delete">
                      <IconButton transparent onClick={handleClickDelAllBoxes}>
                        <Icon iconName="ClearAll" />
                      </IconButton>
                    </Tooltip>
                  </GuideBox>
                </GuideBox>
                <GuideBox show fill='#e8e8e8' padding={1} border='1px solid #ddd'>
                  <TextFieldV2 title="spacing" onChange={handleChangeSpacing} numberOptions={{ onlyInteger: true, min: 0 }} type="number" value={spacing.toString()} />
                </GuideBox>
              </GuideBox>
            </GuideBox>
          </GuideBox>
        </Panel>
      </div>
    </GuideBox>
  );
};

export default App;
