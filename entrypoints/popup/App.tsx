import { useState, useEffect } from 'react';
import './App.css';
import { UTIL } from '../util/utils';
import { Divider, Radio, RadioChangeEvent, Space, Switch } from 'antd';
import useStorage from '../util/hooks';

function App() {
  const [host, setHost] = useState<string>('');

  useEffect(() => {
    const fetchHost = async () => {
      const currentHost = await UTIL.getCurrentTabDomain();
      console.log('current host:', currentHost);
      setHost(currentHost);
    };

    fetchHost();
  }, []);

  const [value, setValue] = useStorage<number>('local:state:quick-scroll' + host, 1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value as number);
  };

  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
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
            <Radio value={3}>Disable this time only</Radio>
          </Space>
        </Radio.Group>

        <Divider />

        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
          <p style={{ fontSize: '1.2rem', width: '100%' }}>Shortcut key:</p>
          <div>
            <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>🔼</kbd>
          </div>
          <div style={{ flex: 1, textAlign: 'right', margin: '0 10px' }}>
            <Switch defaultChecked onChange={onChangeSwitch} />
          </div>
          <div style={{ width: '100%', height: '0.5rem' }}></div>
          <div>
            <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>🔽</kbd>
          </div>
          <div style={{ flex: 1, textAlign: 'right', margin: '0 10px' }}>
            <Switch defaultChecked onChange={onChangeSwitch} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
