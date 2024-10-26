import { useState, useEffect } from 'react';
import './App.css';
import { UTIL } from '../util/utils';
import { Divider, Radio, RadioChangeEvent, Space, Switch } from 'antd';
import { WxtStorage } from '../util/hooks';
import { CONSTANTS } from '../util/constants';

function App() {
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    const fetchHost = async () => {
      const currentHost = await UTIL.getCurrentTabDomain();
      setHost(currentHost);
    };

    fetchHost();
  }, []);

  const [value, setValue] = WxtStorage.useStorage<number>(CONSTANTS.hostStatePrefix + host, 1);
  const [arrowUp, setArrowUp] = WxtStorage.useStorage<boolean>(CONSTANTS.arrowUpStateKey, true);
  const [arrowDown, setArrowDown] = WxtStorage.useStorage<boolean>(CONSTANTS.arrowDownStateKey, true);

  console.log('host:', host);
  console.log('value:', value);
  console.log('arrowUp:', arrowUp);
  console.log('arrowDown:', arrowDown);

  const onChange = async (e: RadioChangeEvent) => {
    const s = e.target.value as number
    setValue(s);
  };

  const onArrowUpChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setArrowUp(checked);
  };

  const onArrowDownChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setArrowDown(checked);
  };

  return (
    <>
      <header>
        <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>Quick Scroll</p>
      </header>
      <main>
        <Divider />

        <p style={{ fontSize: '1.2rem' }}>Buttons Config</p>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Enable on this site</Radio>
            <Radio value={2}>Disable on this site</Radio>
          </Space>
        </Radio.Group>

        <Divider />

        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          <p style={{ fontSize: '1.2rem', width: '100%' }}>Shortcut key:</p>
          <div>
            <kbd>Shift</kbd> + <kbd>🔼</kbd>
          </div>
          <div style={{ flex: 1, textAlign: 'right', margin: '0 10px' }}>
            <Switch checked={arrowUp} onChange={onArrowUpChangeSwitch} />
          </div>
          <div style={{ width: '100%', height: '0.5rem' }}></div>
          <div>
            <kbd>Shift</kbd> + <kbd>🔽</kbd>
          </div>
          <div style={{ flex: 1, textAlign: 'right', margin: '0 10px' }}>
            <Switch checked={arrowDown} onChange={onArrowDownChangeSwitch} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
