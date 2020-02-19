import React, {Component} from 'react';
import {Form, Icon, Input, Button, message, InputNumber, Select, Tabs } from "antd";
import Sitter from './Sitter';
import { API_ROOT, SEARCH_BY_CITYNAME } from '../constants';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const onErrorMessage = "Please verify your searching info";

class NormalSearchForm extends Component {
    zipcode = 10000;
    radius = 0;
    unit = "km";
    cityname = "";

    state = {
        isLoadingSitters: false,
        isSearchCompleted: false,
        error: '',
        sitters: [],
        images: [],
    };
    
    handleSubmit = e => {
        e.preventDefault();
    };

    componentWillMount() {
        this.onSearchConfirm();
        console.log(this.state.images);
    }

    constructor (props) {
        super (props);
        console.log(this.props);
    }

    onChangeZipcode(value) {
        this.zipcode = value;
        //console.log(this.zipcode);
    }

    onChangeRadius(value) {
        this.radius = value;
    }

    onChangeUnit(value) {
        this.unit = (`${value}`);
        // this.setState({startAddress: event.target.value});
    }

    cityNameTextChange(event) {
        this.cityname = event.target.value;
        // this.setState({startAddress: event.target.value});
    }

    onSearchConfirm = () => {
        if(this.cityname === "" && (this.zipcode <= 10000 || this.radius <= 0)) {
            alert(onErrorMessage);
        } else {
            if (this.cityname !== "") {
                return fetch(`${API_ROOT}/search?cityname=${this.cityname}`, {
                    method: 'GET',
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log(data);
                        this.setState({ sitters: data ? JSON.parse(data) : [], isLoadingSitters: false });
                        this.renderImagePosts();
                        message.success('sitter search successfully!');
                    })
                    .catch((e) => {
                        console.error(e);
                        message.error('Failed to search sitter.');
                    });
            } else {
                return fetch(`${API_ROOT}/search?zipcode=${this.zipcode}&radius=${this.radius}&unit=${this.unit}`, {
                    method: 'GET',
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log(data);
                        this.setState({ sitters: data ? JSON.parse(data) : [], isLoadingSitters: false });
                        this.renderImagePosts();
                        message.success('sitter search successfully!');
                    })
                    .catch((e) => {
                        console.error(e);
                        message.error('Failed to search sitter.');
                    });
            }
        }
    };

    renderImagePosts() {
        const { sitters } = this.state;
        if (sitters.length > 0) {
            const images = sitters
                .map((sitter) => {
                    return {
                        sitterId: sitter.sitter_id,
                        sitterName: sitter.first_name + " " + sitter.last_name,
                        sitterEmail: sitter.email,
                        sitterTel : sitter.tel,
                        sitterAddress : sitter.city + " " + sitter.address,
                        sitterZipcode : sitter.zipcode,
                        sitterReviewScore : sitter.review_score,
                        sitterReviews : sitter.reviews,
                        sitterPrice : sitter.price,
                        thumbnail: sitter.images[0].URL,
                        caption: sitter.images[0].caption,
                        thumbnailWidth: 400,
                        thumbnailHeight: 300,
                    };
                });
            this.setState({ isSearchCompleted: true});
            this.setState({ images: images});
            console.log(images);
            // return <Gallery sitters={images}/>
        } else {
            return 'No satisfied sitters';
        }
    }

    render() {
        return (
            <div>
            <div className="search-sitter-form">
                <p id={"title"}>Please enter searching details below.</p>
                <span> Enter City Name below </span>
                <br/>
                <TextArea  className="city-name" onChange={this.cityNameTextChange.bind(this)}
                           onPressEnter={this.onSearchConfirm.bind(this)}
                           placeholder="Please enter city name here. (e.g. New York)"
                           autoSize={{ minRows: 1, maxRows: 1 }}
                />
                <br/>
                <br/>
                <span> Enter Zipcode below     //     Enter Radius below     //     Choose Unit here</span>
                <br/>
                <InputNumber className="zipcode" min={10000} max={99999} defaultValue={10000} onChange={this.onChangeZipcode.bind(this)} />
                <InputNumber className="radius" min={0} max={100000} defaultValue={0} onChange={this.onChangeRadius.bind(this)} />
                <Select className="unit" defaultValue="km" onChange={this.onChangeUnit}>
                    <Option value="mile">mile</Option>
                </Select>
                <br/>
                <br/>
                <button className="search-sitter-button" onClick={this.onSearchConfirm.bind(this)} > Search </button>
                <br/>
                <br/>
                <br/>
            </div>
                <Tabs className="main-tabs">
                    <TabPane tab="Qualified Sitter(s)" key="1">
                        {/*<Gallery sitters={this.state.images} />*/}
                        {/*<button className="display-sitter-button" onClick={this.renderImagePosts.bind(this)} > Show </button>*/}
                        {this.state.images.map(image =>
                            <Sitter key={image.sitterId} sitter={image}/>)}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export const SearchSitter = Form.create({ name: 'normal_search' })(NormalSearchForm);