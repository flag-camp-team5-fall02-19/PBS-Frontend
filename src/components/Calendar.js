import React, {Component} from 'react';

import {DatePicker, Button, message} from 'antd';
import {API_ROOT} from '../constants';
import moment from 'moment';

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            sitterID: '5555',
            startDate: null,
            endDate: null,
            currentUnavailableTime: []
        }
    }

    componentDidMount() {
        this.getCurrentUnavailableTime();
    }

    onChange = (value, dateString) => {
        console.log(dateString);
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1]
        });
    }

    submitUnavailableTime = () => {
        console.log('submit');
        fetch(`${API_ROOT}/setUnavailableTime?sitter_id=${this.state.sitterID}&startDay=${this.state.startDate}&endDay=${this.state.endDate}`, {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(() => {
                message.success('Submit successfully')
            }).catch(() => message.success('Submit failed'))
    }

    disabledDate = (date) => {
        const formattedDate = moment(date).format(dateFormat);
        return date && date < moment().endOf('day') || this.state.currentUnavailableTime.some(item => formattedDate >= item[0] && formattedDate <= item[1]);
    }

    checkSelectedTime = () => {
        return this.state.startDate !== null && this.state.endDate !== null &&
        !this.state.currentUnavailableTime.some(item => this.state.startDate < item[0] && this.state.endDate > item[1]);
    }

    getCurrentUnavailableTime = () => {
        fetch(`${API_ROOT}/viewsitter?sitter_id=${this.state.sitterID}`, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    currentUnavailableTime: data['unavailableTime']
                })
                console.log('===== ', data['unavailableTime']);
                // message.success('Managed to get unavailable time!');
            }).catch((err) => console.log(err))
    }

    render() {
        let button;
        if (this.checkSelectedTime()) {
            button = <Button type="primary" onClick={this.submitUnavailableTime}>Submit</Button>
        } else {
            button = <Button type="primary" onClick={this.submitUnavailableTime} disabled>Submit</Button>
        }
        return (
            <div>
                <h1>Select your unavailable time</h1>
                <RangePicker
                    format={dateFormat}
                    placeholder={['Start Date', 'End Date']}
                    onChange={this.onChange}
                    disabledDate={this.disabledDate}
                />
                {button}
            </div>
        );
    }

}

export default Calendar;