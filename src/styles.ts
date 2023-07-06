import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: #4e8098;
`;

export const Navbar = styled.div`
    width: 30%;
    height: 100vh;
    background-color: #fff;
    padding: 1rem;
`;

export const NavbarItem = styled.div`
    padding: 1rem 0;
    font-size: 1.25rem;
    border-bottom: 1px dashed #000;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    outline: none;
`;

export const EditItemButton = styled.button`
    background: #4e8098;
    color: #fff;
    padding: 0.42rem;
    cursor: pointer;
    border: none;
    font-size: 0.75rem;
    border-radius: 1rem;
    display: none;

    ${NavbarItem}:hover & {
        display: block;
    }
`;


export const EditModal = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.35);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const EditModalBox = styled.div`
    width: 30%;
    height: 30%;
    background-color: #FFF;
    border-radius: 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    input  {
        width: 100%;
        outline: none;
        height: 2.5rem;
        border: none;
        border-bottom: 2px solid #438098;
    }

    button {
        width: 100%;
        height: 2.5rem;
        border-radius: .5rem;
        font-size: 1rem;
        color: #FFF;
        border:none;
        outline: none;
        background-color: #438098;
        cursor: pointer;
    }
`;