import styled, { css } from 'styled-components';


export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-conten: center;
    background: rgb(143,143,143);
    background: linear-gradient(90deg, rgba(143,143,143,1) 0%, rgba(74,74,74,1) 50%, rgba(23,23,23,1) 100%);
    margin: 0;
    height: 100vh;
    width: 100vw; 
`;

export const Canvas = styled.canvas`
`;

export const Container = styled.div`
    margin: auto;
`;

export const Text = styled.p`
    font-family: 'Ocra';
    display: block;
    text-align: center;
`;