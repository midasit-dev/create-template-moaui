import { GuideBox } from "@midasit-dev/moaui";
import { InnerContentSizeAutoState, InnerContentSizeState } from "./DevTools/recoilState";
import { useRecoilValue } from "recoil";

const InnerContentSize = (props: any) => {
	const { children } = props;
	const { width, height } = useRecoilValue(InnerContentSizeState);
	const isAuto = useRecoilValue(InnerContentSizeAutoState);

	const sizeProps = isAuto ? { width: 'auto', height: 'auto' } : { width, height };

	return (
		<GuideBox id='app-size' center {...sizeProps}>
			{children}
		</GuideBox>
	)
}

export default InnerContentSize;
