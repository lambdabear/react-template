/*
 * File: /src/pages/Home/BaseStation.js
 * Project: template
 * Description:
 * Created By: Tao.Hu 2019-10-19
 * -----
 * Last Modified: 2019-10-19 05:26:04 pm
 * Modified By: Tao.Hu
 * -----
 * Copyright (c) 2019 Kideasoft Tech Co.,Ltd
 */
import React, { useState, useEffect } from 'react';

import { Descriptions, Badge } from 'antd';

const deviceCfg = {
  deviceId: (i) => `设备【${i}】ID`,
  battery: () => '电池容量',
  data: () => '压力值',
};

function BaseStation() {
  const [gateways, setGateways] = useState([{
    imei: '',
    gatewayID: '', // 基站id
    rssi: 0, // 信号强度
    battery: 0, // /1000 = 电量
    operator: 0, // 运营商编码
    ipAddr: '0.0.0.0',
    updateTime: '2019-01-01 00:00:00',
    temperature: 0.0,
    humidity: 0.0,
    devices: [],
  }]);
  useEffect(() => {
    const ws = new WebSocket('ws://161.189.35.235:8088/ws/');
    setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('pong');
      }
    }, 60 * 1e3);
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setGateways(msg);
      } catch (error) {
        console.error('json parse error:', error);
      }
    };
    ws.onclose = (e) => console.log('ws close:', e.code, e.reason);
    ws.onerror = (e) => console.log('ws error:', e);

    return () => ws.close();
  }, []);
  return ( 
    <div>
    {
    Array.isArray(gateways) && gateways.map(data => {return (<div>
      <Descriptions title="LoRa-NB 网关" bordered>
        <Descriptions.Item label="网关ID">{data.gatewayID.substring(16)}</Descriptions.Item>
        <Descriptions.Item label="信号强度">{data.rssi}</Descriptions.Item>
        <Descriptions.Item label="电压">{`${(data.battery / 1000).toFixed(2)} V`}</Descriptions.Item>
        <Descriptions.Item label="电量">{`${(((data.battery / 1000) - 3.0) / 0.6 * 100).toFixed(0)} %`}</Descriptions.Item>
        <Descriptions.Item label="温度">{`${data.temperature.toFixed(1)} °C`}</Descriptions.Item>
        <Descriptions.Item label="湿度">{`${data.humidity.toFixed(1)} %`}</Descriptions.Item>
        <Descriptions.Item label="运营商">{data.operator === 46011 ? `电信` : `移动`}</Descriptions.Item>
        <Descriptions.Item label="IP地址">{data.ipAddr}</Descriptions.Item>
        <Descriptions.Item label="更新时间" span={2}>{data.updateTime}</Descriptions.Item>
        <Descriptions.Item label="状态" span={3}>
          <Badge
            status={data.updateTime ? 'success' : 'default'}
            text={data.updateTime ? '在线' : '离线'}
          />
        </Descriptions.Item>
        {
          data.devices.map((e, index) => Object.keys(e).map((key) => (
            <Descriptions.Item label={deviceCfg[key](index + 1)}>
              {key === 'data' ? `${e[key].toFixed(2)} MPa` : (key === 'battery' ? `${e[key]} %` : e[key])}
            </Descriptions.Item>
          )))
        }
      </Descriptions>
    </div>)})
  }
  </div>
  );
}

export default BaseStation;
