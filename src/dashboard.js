// 3rd-party imports

import React from 'react';

import styled from "styled-components";

// component

const Container = styled.div``;

const Graph = styled.div`

    background-color: #e9ecef;
`;

const Gutter = styled.div``;

const Dashboard = () => {
    return <Container className="center mw9 pa4">

    <Graph className="br2 pa5 tc">{'GRAPH'}</Graph>
    <Gutter className="mv4" />
    <span>{'dashboard'}</span></Container>;
}

export default Dashboard;
