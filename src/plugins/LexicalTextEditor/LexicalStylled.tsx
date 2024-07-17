import styled from "styled-components";


export const CopyButton = styled.button`
position: absolute;
right: -40px;
cursor: pointer;
background-color: white;
padding: 5px 7px;
border-radius: 50%;
border: none;
visibility: hidden;
`
export const DeleteButton = styled.button`
position: absolute;
right: -75px;
cursor: pointer;
background-color: white;
padding: 5px 7px;
border-radius: 50%;
border: none;
visibility: hidden;
`

export const DragButton = styled.button`
position: absolute;
left: -40px;
cursor: pointer;
background-color: white;
padding: 5px 7px;
border-radius: 50%;
border: none;
visibility: hidden;
`

export const Fdiv = styled.div`
display: flex;
justify-content: center;
width: 100%;

&:hover ${CopyButton}{
visibility: visible;
}

&:hover ${DeleteButton}{
visibility: visible;
}

&:hover ${DragButton}{
visibility: visible;
}
`

export const TextEditor = styled.div`
border: none;
border: 1px solid orange;
width: 50%;
background-color: white;
position: relative;
`