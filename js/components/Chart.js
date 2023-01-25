import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
  VictoryAxis,
} from 'victory-native';
import moment from 'moment';
import { View, Text } from 'react-native';

export default function LineGraph(props) {

  let dataMap = props.data ? props.data.map((d, i) => {
    let unix = moment(d.created_at).unix();
    let map = { x: unix, y: parseFloat(d.values) };
    return map;
  }) : [];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <VictoryChart
        domain={props.domain}
        theme={VictoryTheme.material}
        animate={{ duration: 700, onLoad: { duration: 800 } }}
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
        scale={{ x: 'time' }}>
        {/* <VictoryAxis label="Temp" dependentAxis orientation="left"/>
        <VictoryAxis label="Time (ms)" orientation="bottom"/> */}
        <VictoryLine
          // labels={({ datum }) => `${datum.y}`}
          interpolation="natural"
          data={dataMap}
          // groupComponent={
          //   <VictoryClipContainer clipPadding={{ top: 0, right: 0 }} />
          // }
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
        />
      </VictoryChart>
    </View>
  );
}
