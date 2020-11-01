import React, { Fragment } from 'react';
import './App.css';
import Select from './components/select/index';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            options:[
                {
                    label:'option1',
                    value:1
                },
                {
                    label:'option2',
                    value:2
                },
                {
                    label:'option3',
                    value:3
                },
                {
                    label:'option4',
                    value:4
                },
                {
                    label:'option5',
                    value:5
                },
                {
                    label:'option6',
                    value:6
                }
            ],
            labelName:'选择器名称',
            placeholder: '请选择'
        }
    }

    onSelectChange = (val) => {
        console.log(val);
    }

    render(h) {
        const { labelName, options, placeholder } = this.state;
        return (
            <Fragment>
                <Select labelName={labelName} options={options} placeholder={placeholder} onChange={this.onSelectChange}></Select>
            </Fragment>
        );
    }
}

export default App;
