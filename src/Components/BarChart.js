import React, { Component } from 'react'
import '../App.css'

import * as d3 from 'd3'


class BarChart extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const node = this.node
        const margin = 60;
        const tickLabels = [0,2000]
        const lineWidth = 40;
        let yAxis = d3.scaleLinear().range([0,this.props.size[0]]).domain([0,2000])
        const dataMax = d3.max(this.props.data,(d) => {return d.value})
        const yScale = d3.scaleLinear()
            .range([0, this.props.size[1]])
            .domain([0,2000])
        const yOverLimitScale = d3.scaleLinear().range()


        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')


        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', () => {if(this.props.data < 2000) {return '#fe9922'}
                                                    else {return '#fe0005'}})
            .attr('x', (d,i) => i )
            .attr('y', d => {return this.props.size[1] - yScale(d)})
            .attr('height', d => yScale(d))
            .attr('width', lineWidth)


        d3.select(node)
            .append('g')
            .attr('class','y-axis')
            .attr('transform',"translate(" + lineWidth/2 + ",0)")
            .call(d3.axisLeft(yAxis).ticks(2).tickPadding(30).tickSize(3)
               )
        d3.select(node).attr("transform","translate(30,-80)")
    }
    render() {
        return <svg ref={node => this.node = node}>
        </svg>
    }}
export default BarChart
