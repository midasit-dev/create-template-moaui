import React, { useEffect, useRef, useState } from 'react';
import JSONEditor, { type JSONEditorOptions } from 'jsoneditor';
import { debounce } from 'lodash';

import 'jsoneditor/dist/jsoneditor.min.css';

// interface JsonEditorProps {
// 	anyArray: [
// 		LayoutGuideBox | undefined,
// 		React.Dispatch<React.SetStateAction<LayoutGuideBox | undefined>>,
// 	];
// }

const JsonEditor = () => {
	// const {anyArray} = props;
	// const [layoutGuideBoxSchema, setLayoutGuideBoxSchema] = anyArray;

  // const editorContainerRef = useRef<HTMLDivElement | null>(null);
  // const [editor, setEditor] = useState<JSONEditor | null>(null);

	// const prevLayoutGuideBoxSchema = useRef<LayoutGuideBox | undefined>(undefined);

  // useEffect(() => {
  //   // create the editor
  //   const container = editorContainerRef.current;
  //   if (!container) return;

  //   const options: JSONEditorOptions = {
	// 		mode: 'code',
	// 		modes: ['code', 'tree'], // set all allowed modes
	// 		onChangeText: debounce((jsonString) => {
	// 			try {
	// 				const parsed = JSON.parse(jsonString);
	// 				setLayoutGuideBoxSchema(parsed);
	// 			} catch (e) {
	// 				console.error(e);
	// 			}
  //     }, 100),
	// 		onSelectionChange(start, end) {
	// 			console.log(start, end);
	// 		},
	// 		onEvent(node, event) {
	// 			console.log(node, event);
	// 			if (node.field === 'tag' && node.path) {
	// 				// node.path = ['props', 'tag']
	// 				const value = node.path.reduce((acc: any, key: any) => acc && acc[key], layoutGuideBoxSchema);
	// 				console.log(value);
	// 			}
	// 		},
	// 	};
  //   const newEditor = new JSONEditor(container, options);
  //   setEditor(newEditor);

  //   // set initial JSON
	// 	const initialJson = {};
  //   newEditor.set(initialJson);

  //   // cleanup when the component is unmounted
  //   return () => {
  //     newEditor.destroy();
  //   };
	// 	// es-lint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
	
	// useEffect(() => {
	// 	if (editor && prevLayoutGuideBoxSchema.current !== layoutGuideBoxSchema) {
	// 		editor.update(layoutGuideBoxSchema);
	// 		prevLayoutGuideBoxSchema.current = layoutGuideBoxSchema;
	// 	}
	// }, [editor, layoutGuideBoxSchema]);

  // return (
  //   <div>
  //     <div ref={editorContainerRef} style={{ width: '500px', height: '400px' }}></div>
  //   </div>
  // );
};

export default JsonEditor;
