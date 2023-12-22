import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import { GuideBox, Panel, Typography, VerifyDialog, VerifyUtil } from '@midasit-dev/moaui';
import { setGlobalVariable, getGlobalVariable } from './pyscript_utils';
import { SnackbarProvider } from 'notistack';

const ValidWrapper = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [checkUri, setCheckUri] = React.useState(false);
  const [checkMapiKey, setCheckMapiKey] = React.useState(false);
	const [checkMapiKeyMsg, setCheckMapiKeyMsg] = React.useState("");

  React.useEffect(() => {
    const callback = async () => {
      //redirectTo와 mapi-key 유효성 검사
      let _checkUri = true;
      let _checkMapiKey = true;

      const url = VerifyUtil.getProtocolDomainPort();
      const resUrl = await fetch(`${url}/health`);
      if (resUrl.status !== 200) {
        _checkUri = false;
      }
      setCheckUri(_checkUri);

      const mapiKey = VerifyUtil.getMapiKey();
      const verifyMapiKey = await VerifyUtil.getVerifyInfoAsync(mapiKey);
      if (verifyMapiKey.hasOwnProperty("error")) {
        _checkMapiKey = false;
				setCheckMapiKeyMsg('error');
      }
			if (verifyMapiKey.hasOwnProperty("keyVerified")) {
				if (!verifyMapiKey["keyVerified"]) {
					_checkMapiKey = false;
					setCheckMapiKeyMsg('keyVerified');
				}
			}
			if (verifyMapiKey.hasOwnProperty("status")) {
				if (verifyMapiKey["status"] === "disconnected") {
					_checkMapiKey = false;
					setCheckMapiKeyMsg('disconnected');
				}
			}
      setCheckMapiKey(_checkMapiKey);

      if (!_checkUri || !_checkMapiKey) return;

      setIsValid(true);
    };

    callback();
  }, []);

  return (
    <>
      {isValid && (
        <RecoilRoot>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </RecoilRoot>
      )}
      {!isValid && (
        <Panel variant="shadow2" padding={3} margin={3}>
          <GuideBox opacity={0.9} spacing={2}>
            <Typography variant="h1">Validation Check</Typography>
            <GuideBox spacing={2}>
              <GuideBox row horSpaceBetween width={300}>
                <Typography variant="body1">Base URI: </Typography>
                {checkUri ? (
                  <Typography variant="h1" color="#1f78b4">
                    Valid
                  </Typography>
                ) : (
                  <Typography variant="h1" color="#D32F2F">
                    Invalid
                  </Typography>
                )}
              </GuideBox>
              <GuideBox row horSpaceBetween width={300}>
                <Typography variant="body1">MAPI-Key: </Typography>
                {checkMapiKey ? (
                  <Typography variant="h1" color="#1f78b4">
                    Valid
                  </Typography>
                ) : (
                  <Typography variant="h1" color="#D32F2F">
                    {`Invalid (${checkMapiKeyMsg})`}
                  </Typography>
                )}
              </GuideBox>
            </GuideBox>
          </GuideBox>
        </Panel>
      )}
    </>
  );
};

const PyscriptWrapper = () => {
	const [ installed, setInstalled ] = React.useState(false);

	//fill in global variables
	React.useEffect(() => {
    function checkPyScriptReady(callback : any) {
      // if pyscript is ready, call callback function
      if (pyscript && pyscript.interpreter) {
        setGlobalVariable();
        getGlobalVariable();
				setInstalled(true);
      } else {
        // if not, wait 100ms and try again
        setTimeout(() => checkPyScriptReady(callback), 100);
      }
    }
 
    checkPyScriptReady(() => {});
  }, []);

	return (
		<>
			<VerifyDialog loading={!installed} />
			{installed && VerifyUtil.isExistQueryStrings('mapiKey') &&
				<ValidWrapper />
			}
		</>
	)
}

export default PyscriptWrapper;