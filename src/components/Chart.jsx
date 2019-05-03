import React from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from 'bizcharts'
import DataSet from '@antv/data-set'

class Curved extends React.Component {
  render () {
    const data = [
      {
        date: 'Jan',
        发布: 7.0,
        参与: 3.9
      },
      {
        date: 'Feb',
        发布: 6.9,
        参与: 4.2
      },
      {
        date: 'Mar',
        发布: 9.5,
        参与: 5.7
      },
      {
        date: 'Apr',
        发布: 14.5,
        参与: 8.5
      },
      {
        date: 'May',
        发布: 18.4,
        参与: 11.9
      },
      {
        date: 'Jun',
        发布: 21.5,
        参与: 15.2
      },
      {
        date: 'Jul',
        发布: 25.2,
        参与: 17.0
      },
      {
        date: 'Aug',
        发布: 26.5,
        参与: 16.6
      },
      {
        date: 'Sep',
        发布: 23.3,
        参与: 14.2
      },
      {
        date: 'Oct',
        发布: 18.3,
        参与: 10.3
      },
      {
        date: 'Nov',
        发布: 13.9,
        参与: 6.6
      },
      {
        date: 'Dec',
        发布: 9.6,
        参与: 4.8
      }
    ]
    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: 'fold',
      fields: ['发布', '参与'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature' // value字段
    })
    console.log(dv)
    const cols = {
      date: {
        range: [0, 1]
      }
    }
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name='date' />
          <Axis
            name='temperature'
            label={{
              formatter: val => `${val}`
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y'
            }}
          />
          <Geom
            type='line'
            position='date*temperature'
            size={2}
            color={'city'}
            shape={'smooth'}
          />
          <Geom
            type='point'
            position='date*temperature'
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}

export default Curved
