import { useState, useEffect } from "react";
import { StorageItemKey } from "wxt/storage";

// 封装useStorage Hook
function useStorage<TValue>(
  key: string,
  initialValue: TValue,
  type: string = "local"
) {
  const meta = type === "local" ? `local:perf` : `session:perf`;

  // 使用useState钩子来创建一个状态变量和一个设置该状态的函数
  const [value, setValue] = useState<TValue | undefined>(undefined);

  useEffect(() => {
    const fetchStoredValue = async () => {
      try {
        // 尝试从storage中获取值
        const storedValue = (await storage.getMeta(meta))[key];
        setValue(storedValue !== undefined ? (storedValue as TValue) : initialValue);
      } catch (error) {
        console.error("获取存储值出错:", error);
        setValue(initialValue); // 出错时回退到初始值
      }
    };

    fetchStoredValue();
  }, [key, initialValue, meta]);

  // 使用useEffect钩子来监听值的变化，并同步到storage
  useEffect(() => {
    const setStoredValue = async () => {
      if (value !== undefined) {
        try {
          await storage.setMeta(meta, { [key]: value });
        } catch (error) {
          console.error("存储值出错:", error);
        }
      }
    };

    setStoredValue();
  }, [key, value, meta]);

  // 返回状态和设置状态的函数
  return [value, setValue] as const;
}

async function get<TValue>(
  key: string,
  defaultValue: TValue,
  type: string = "local"
) : Promise<TValue|undefined> {
  const meta = type === "local" ? `local:perf` : `session:perf`;
  const v = (await storage.getMeta(meta))[key];
  return v !== undefined ? (v as TValue) : defaultValue;
}


export const WxtStorage = {
  useStorage: useStorage,
  get: get,
};
