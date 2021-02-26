import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from 'victory-native';
import moment from 'moment';
import { View, Text } from 'react-native';

export default function LineGraph(props) {

  let dataMap = props.data ? props.data.map((d, i) => {
    let date = moment(d.created_at).unix();
    let map = { x: date, y: parseFloat(d.values) };
    return map;
  }) : [];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <VictoryChart
        name={props.name}
        domain={props.domain}
        theme={VictoryTheme.material}
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
        width={600}
        height={500}
        scale={{ x: 'time' }}>
        <VictoryLine
          // labels={({ datum }) => `${datum.y}`}
          interpolation="natural"
          data={dataMap}
          groupComponent={
            <VictoryClipContainer clipPadding={{ top: 0, right: 0 }} />
          }
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
        />
      </VictoryChart>
    </View>
  );
}
