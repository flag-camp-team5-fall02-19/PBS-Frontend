import React, {Component} from 'react';

class BottomNavBar extends Component {
    render() {
        return (
            <footer>
                <section>
                    <h2>What We Do</h2>
                    <p>"Help you find the best pet boarding service around."</p>
                </section>
                <section>
                    <h2>About Us</h2>
                    <ul className='bottom-list'>
                        <li>Xichen Liu</li>
                        <li>Qi Chu</li>
                        <li>Jie Lian</li>
                        <li>Lu Yang</li>
                        <li>Kaixin Li</li>
                        <li>Jingyi Pan</li>
                        <li>Yanhao Zeng</li>
                    </ul>
                </section>
            </footer>
        );
    }
}

export default BottomNavBar;