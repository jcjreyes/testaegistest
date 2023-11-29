import styled from "styled-components";

export const Section = styled.section``;
export const Container = styled.div`
    width: calc(100% - 17.5vw);
    padding: 2rem 5rem;
    min-height: 80vh;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: align-items;
    align-content: center;
    border-top: 1px solid #BDBDBD;
`;

export const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    width: 100%;
`;

export const Column = styled.div`
    box-sizing: border-box;
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding-right: 1.5rem;

    :nth-child(2n) {
        width: 55%;
    }

    :nth-child(2n+1) {
        width: 45%;
    }
`;

export const SearchWrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-bottom: 2rem;
`;

export const Row = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin: 1rem 0;

    &&.schedule__header {
        width: 90%;
        margin: 0 0 0.5rem 1rem;
    }

    &&.full__width {
        width: 100%;
    }

    &&.timeslot {
        margin: 1rem 0 0 0;
    }

    &&.add__button {
        margin: 0 0 1rem 0;
    }

    &&.centered {
        width: 100%;
        justify-content: center;
        padding: 2rem 0;
    }
`;

export const DateWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    align-content: center;

    &&.end {
        justify-content: flex-end;
    }
`;

export const DateCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;

    &&.centered {
        align-items: center;
    }

    &&.end {
        align-items: flex-end;
    }
`;

export const Day = styled.p`
    font-size: 10px;
    line-height: 20px;
    text-transform: uppercase;
    color: #001196;

    &&.muted {
        color: #BDBDBD;
    }

    &&.schedule__label {
        text-transform: capitalize;
        color: #000000;
    }
`;

export const DayDate = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    color: #001196;

    &&.muted {
        font-weight: 500;
        color: #8C8C8C;
    }
`;

export const MonthYear = styled.p`
    font-size: 1.25rem;
    line-height: 2rem;
    color: #8C8C8C;
    padding-left: 0.5rem;
`;

export const Title = styled.h1``;
export const Link = styled.p`
    cursor: pointer;
    color: #001196;
    transition: all 0.3s ease;

    :hover {
        color: #000E77;
    }
`;

export const Info = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 0.4rem 0;
`;

export const InfoMarker = styled.div.attrs(props => ({
    background: props.color || "#D5EBF8"
}))`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${props => props.background};
`;

export const InfoLabel = styled.p`
    cursor: pointer;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #333;
    padding: 0 1.5rem;
    transition: all 0.3s ease;

    :hover {
        color: #001196;
    }

    &&.normal {
        font-weight: 500;
    }
`;

export const InfoText = styled.p`
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #8C8C8C;
    padding-right: 1.5rem;
`;

export const InfoSubtext = styled.p`
    color: #8C8C8C;

    &&.lighter {
        color: #BDBDBD;
    }
`;

export const ScheduleWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    border-bottom: 0.5px solid #BDBDBD;

    &&.schedules {
        border: none;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        align-content: center;
    }

    &&.schedules ${Row} {
        margin: 0 0 1rem 0;
    }

    &&.schedules .timeslot {
        margin: 1rem 0;
    }
`;

export const ScheduleSlots = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
`;

export const Schedule = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border: 0.5px solid #BDBDBD;
    padding: 0.25rem 1.25rem;
    box-sizing: border-box;
    margin-top: -1px;

    :first-child {
        margin-top: 0;
    }
`;

export const ScheduleTitle = styled.p`
    width: 20%;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &&.id__number {
        width: 15%;
    }
`;

export const ScheduleInfo = styled.img`
    cursor: pointer;
    padding: 0 0.75rem;
`;

export const ScheduleText = styled.p`
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &&.attendance {
        width: 20%;
    }

    &&.extend {
        width: 35%;
    }
`;

export const ScheduleTag = styled.div`
    width: 25%;
`;

export const ArrowButtons = styled.div`
    width: 10%;
    align-self: stretch;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    align-content: center;

    && img {
        cursor: pointer;
    }
`;

export const TimeSlot = styled.div`
    width: 12.5%;
    padding-right: 0.5rem;
    align-self: stretch;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

export const Time = styled.p``;

export const HoverCardText = styled.p`
    cursor: default;
    width: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
    transition: all 0.3s ease-in-out;
`;

export const HoverCard = styled.div.attrs(props => ({
    color: props.color || "#56CCF2",
}))`
    width: auto;
    align-self: stretch;
    background: ${props => props.color};
    color: ${props => props.color};
    border-radius: 8px 0px 0px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    ${HoverCardText} {
        opacity: 0;
    }

    :hover ${HoverCardText} {
        width: 100%;
        opacity: 1;
        padding: 0.5rem;
    }
`;