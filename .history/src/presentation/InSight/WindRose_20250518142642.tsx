import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryArea, VictoryTheme } from 'victory-native';

interface Props {
  speed: number; // velocidad promedio m/s
  size?: number; // diametro px
}

const cardinal = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export default function WindRose({ speed, size = 220 }: Props) {
  // Distribuimos la misma velocidad en los 8 brazos
  const data = cardinal.map(dir => ({ x: dir, y: speed }));

  return (
    <View style={{ width: size, height: size }}>
      <VictoryChart
            polar                         
            standalone={false}
            width={size}
            height={size}
            theme={VictoryTheme.material}
            domain={{ y: [0, speed] }}
            >
            <VictoryArea
                data={data}
                style={{ data: { fillOpacity: 0.3 } }}
            />
        </VictoryChart>
    </View>
  );
}
