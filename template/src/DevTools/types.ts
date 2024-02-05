interface LayoutBox {
	id: string;
	element: JSX.Element;
}

interface LayoutBoxes extends Array<LayoutBox> {};

/**
 * {
 * 		type: {
 * 			type: 'string',
 * 			description: 'UI 요소의 종류 (예: "Button", "Input", "Form", 등)'
 * 		},
 * 		props: {
 * 			type: 'object',
 * 			description: 'UI 요소에 전달되는 속성들',
 * 			properties: {
 * 				// 여기에 해당 UI 요소의 속성을 정의합니다.
 * 			}
 * 		},
 * 		children: {
 * 			type: 'array',
 * 			description: '하위 UI 요소들',
 * 			items: {
 * 				type: 'object',
 * 				$ref: '#'
 * 			}
 * 		}
 * }
 * 
 * @typedef {Object} LayoutSchema2
 * @property {string} type - UI 요소의 종류 (예: 'Button', 'Input', 'Form', 등)
 * @property {Object} props - UI 요소에 전달되는 속성들
 * @property {Array<LayoutSchemas2>} children - 하위 UI 요소들
 */
interface LayoutSchema2 {
	type: 'FloatingBox' | 'Button';
	props?: Record<string, any>;
	children?: Array<LayoutSchema>;
}

interface LayoutSchemas2 extends Array<LayoutSchema2> {};

interface LayoutSchema {
	id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  parent?: string | null;
}

interface LayoutSchemas extends Array<LayoutSchema> {}

type ControllerInputs = {
  x: number;
  y: number;
  width: number;
  height: number;
  spacing: number;
}

export type {
	LayoutBox,
	LayoutBoxes,
	LayoutSchema,
	LayoutSchemas,
	ControllerInputs,

	LayoutSchema2,
	LayoutSchemas2,
}