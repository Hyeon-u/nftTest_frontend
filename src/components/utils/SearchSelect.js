import React, { useEffect, useState } from 'react'
import { Col, Typography, Row, Layout, Menu, Input, Select, Radio, Image, Button, Checkbox, Modal } from 'antd';
import axios from 'axios';
import { apiUrl } from '../../config';

//props.artistlist 를 입력하면 이것을 기반으로 search를 하며 동적으로 select할 것을 보여줌.
//결과는 props.onSelect callback으로 리턴
function SearchSelect(props) {
    const {Option} = Select;

    //const tmplist=['aPicasso', 'aPacasso', 'aUnregistered Artist', 'uuu'];

    const trender = props.artistlist.map((titem, index)=>{
        return (
            <Option key={index} value={index}>{titem}</Option>        
        )
    });

    function filteropt(input, option) {
        if (option.children==='Unregistered')           //Unregistered는 항상 나타나야 함.
            return true;
        return (option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    }

    function filtersort(optionA, optionB) {             //todo : 아무것도 입력하지 않았을 때도 sort 필요
        if (optionA.children==='Unregistered')
            return 1;
        else if (optionB.children==='Unregistered')
            return -1;

        return (optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase()));
    }

    function onSelect(val) {
        props.onSelect(val);
    }

    return (
        <div>
            <Select
                showSearch
                style           ={{ width: 200 }}
                placeholder     ="Search to Select"
                optionFilterProp="children"
                filterOption    ={filteropt}
                filterSort      ={filtersort}
                onSelect        ={onSelect}
            >
                {trender}
            </Select>        
        </div>
    )

}

export default SearchSelect
