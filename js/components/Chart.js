import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
  VictoryAxis,
} from 'victory';
import moment from 'moment';

export default function LineGraph(props) {
  console.log(props);

  let dataMap = props.data.map((d, i) => {
    let date = moment(d.created_at).format('MM:SS');
    let map = {x: date, y: parseFloat(d.values)};
    return map;
  });

  return (
    <VictoryChart
      domain={props.domain}
      theme={VictoryTheme.material}
      animate={{duration: 500, onLoad: {duration: 500}}}
      padding={{top: 40, bottom: 80, left: 40, right: 80}}
      width={600}
      height={470}
      scale={{x: 'time'}}>
      <VictoryLine
        // labels={({ datum }) => `${datum.y}`}
        data={dataMap}
        groupComponent={
          <VictoryClipContainer clipPadding={{top: 5, right: 10}} />
        }
        style={{
          data: {stroke: '#c43a31'},
          parent: {border: '1px solid #ccc'},
        }}
      />
    </VictoryChart>
  );
}
