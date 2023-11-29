import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import SmallLeftArrow from "../../assets/left_arrow_2.png"
import LeftArrow from "../../assets/left_arrow.png"
import RightArrow from "../../assets/right_arrow.png"

import Header from "../../../../components/Header";
import Chip from "../../../../components/Chip";
import Button from "../../../../components/Button";
import Spinner from "../../../../components/Spinner";
import { Section } from "../../styles";

import { format, parseISO } from "date-fns";

import { useQuery } from 'react-query';
import { ReschedulingRequestsDetail } from "../../../../services";
import { get } from "../../../../config/api"

import {
    RequestSection,
    RequestContainer,
    RequestNav,
    RequestNavLink,
    PrevLink,
    NextLink,
    PrevArrow,
    ArrowLabel,
    NextArrow,
    RequestNavBtns,
    RequestNavBtnLabel,
    RequestNumber,
    RequestCard,
    CardHeader,
    CardHeaderText,
    CardContent,
    CardContentLeft,
    CardContentRight,
    CardContentRightCentered,
    Info,
    GroupInfo,
    GroupInfoColumn,
    FileContainer,
    FileLabelWrapper,
    FileLabel,
    FileFrame,
    CardContentLabel,
    CardContentLabelGold,
    CardContentText,
    CardContentTextBold,
    CardContentTextItalic,
    Line,
    CardFooter,
    CardButtons,
    RequestFooter,
    RequestFooterContent,
    RequestFooterText,
    RequestFooterLink
} from './styles'
import { DayDate } from '../../../PhotoshootDays/styles';

const SampleData = [
    {
        "id": 1100,
        "reschedule": {
            "id": 173854,
            "date": "2021-09-23T16:00:00.386Z",
            "requestee": {
                "name": "Katrina Louise D. Santos",
                "email": "hello.again@obf.ateneo.edu",
                "slug": "/rescheduling/173854/"
            },
            "category": "Individual",
            "tags": [
                "scholar"
            ],
            "status": "pending",
            "admin_action": {
                "admin_name": "Enzo Pisig",
                "action_date": "2021-10-03T09:54:00.386Z",
            },
            "or_number":"123456",
            "payment_date":"2021-06-06T23:30:00.386Z",
            "current_date":"2021-12-02T16:00:00.000Z",
            "reason":"Missed original schedule",
        }
    },
    {
        "id": 1100,
        "reschedule": {
            "id": 173854,
            "date": "2021-04-23T16:01:36.386Z",
            "requestee": {
                "name": "Block X4",
                "email": "hello.again@obf.ateneo.edu",
                "size": 40,
                "point_person": "Josh Taningco",
                "id_number": "184864",
                "slug": "/rescheduling/173854/"
            },
            "category": "Group",
            "tags": [
                "accredited"
            ],
            "status": "Approved",
            "admin_action": {
                "admin_name": "Enzo Pisig",
                "action_date": "2021-10-03T09:54:00.386Z",
            },
            "or_number":"123456",
            "payment_date":"2021-10-06T23:30:00.386Z",
            "current_date":"2021-12-02T16:00:00.000Z",
            "reason":"Missed original schedule",
        }
    }
]

const Status = ({ value }) => {
    if (value.toLowerCase() == 'pending') {
        return (
            <>
                <Chip type="default" text={value} />
            </>
        )
    } else if (value.toLowerCase() == 'approved') {
        return (
            <>
                <Chip type="success" text={value} />
            </>
        )
    } else if (value.toLowerCase() == 'declined') {
        return (
            <>
                <Chip type="failure" text={value} />
            </>
        )
    }
}

function SpecificRequest() {
    // let [request, setRequest] = useState([]);
    // let [total, setTotal] = useState(0);
    let slug = useParams();
    let id = slug && slug.id;
    const [totalData, setTotalData] = useState(0)
    const [data, setData] = useState(null)

    // Get Photoshoot Period Settings
    const { data: requests } = useQuery(
        'requests', 
        ReschedulingRequestsDetail.index,
        {
            onSuccess: (data) => {
                setTotalData(data && data.length)
            }
        }
    )

    useEffect(() => {
        get(`/api/rescheduling-requests/${id}/`).then((resp) => setData(resp.data));
    }, [])

    // Placeholder by getting highest id in sample data (replace with .length once integrated)
    var total = totalData && totalData
    var status = data && data.status

    var nextSlug = useHistory();
    var date = data && format(parseISO(data.date_submitted), "MMMM dd, yyyy")
    var time = data && format(parseISO(data.date_submitted), "hh:mm:ssa")
    var payment_date = format(parseISO(SampleData[0]['reschedule']['payment_date']), "MMMM dd, yyyy  pp")
    
    var currentDate = data && data.photoshoot.photoshoot_datetime
    var formattedCurrentDate = data && format(parseISO(currentDate.date.available_date), "MMMM dd, yyyy")
    var timeList = data && String(currentDate.time).split(":")
    var formattedCurrentTime = data && format(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), timeList[0], timeList[1], timeList[2]), "h:mm a")

    var action_date = data && format(parseISO(data.status_changed), "MMMM dd, yyyy  pp")

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var tags = SampleData[0]['reschedule']['tags'].map(function(x){ return capitalizeFirstLetter(x); }).join(', ')

    function handlePrevArrowClick(e) {
        e.preventDefault();
        if (parseInt(id) != 1) {
            var nextId = parseInt(id) - 1;
            var url = '/rescheduling/' + String(nextId);
            nextSlug.push(url)
        }
    }

    function handleNextArrowClick(e) {
        e.preventDefault();
        if (parseInt(id) < total) {
            var nextId = parseInt(id) + 1;
            var url = '/rescheduling/' + String(nextId);
            nextSlug.push(url)
        }
    }

    function handleSubmit(sStatus) {
        ReschedulingRequestsDetail.updateRequest(id, {
            status: sStatus
        })
    }

    return (
        <>
            <Section>
                    <Header dashboard={false} pageLabel="Rescheduling Requests" />
            </Section>
            <RequestSection>
                <RequestContainer>
                    <RequestNav>
                        <RequestNavLink to='/rescheduling/'>
                            <PrevArrow src={SmallLeftArrow} />
                            <ArrowLabel>Rescheduling Requests</ArrowLabel>
                        </RequestNavLink>
                        <RequestNavBtns>
                            <RequestNavBtnLabel>
                                Showing
                                <RequestNumber> Request # {id} </RequestNumber>
                                of {total} results
                            </RequestNavBtnLabel>
                            <PrevLink to="/" onClick={handlePrevArrowClick}>
                                <PrevArrow src={LeftArrow} />
                            </PrevLink>
                            <NextLink to="/" onClick={handleNextArrowClick}>
                                <NextArrow src={RightArrow} />
                            </NextLink>
                        </RequestNavBtns>
                    </RequestNav>
                    <RequestCard>
                        {
                            data && data
                            ?
                                <>
                                    <CardHeader>
                                        <CardHeaderText>Request # {data.id}</CardHeaderText>
                                        <Status value={status} />
                                    </CardHeader>
                                    <CardContent>
                                        <CardContentLeft>
                                            <Info>
                                                <CardContentLabel>Date of Request</CardContentLabel>
                                                <CardContentText>{date}<span style={{margin: "0 0.25rem"}} />{time}</CardContentText>
                                            </Info>
                                            {
                                                data.photoshoot.photoshoot_type == 'Individual'
                                                ?
                                                <>
                                                    <Info>
                                                        <CardContentLabel>Student Name</CardContentLabel>
                                                        <CardContentText>{data.photoshoot.individual_photoshoot.name}</CardContentText>
                                                    </Info>
                                                    <Info>
                                                        <CardContentLabel>ID Number</CardContentLabel>
                                                        <CardContentText>{data.photoshoot.individual_photoshoot.id_number}</CardContentText>
                                                    </Info>
                                                    <Info>
                                                        <CardContentLabel>Tags</CardContentLabel>
                                                        <CardContentText>{data.photoshoot.individual_photoshoot.is_scholar == false ? "Scholar" : ""}</CardContentText>
                                                    </Info>
                                                    <Info>
                                                        <CardContentLabel>Email Address</CardContentLabel>
                                                        <CardContentText>{data.photoshoot.individual_photoshoot.email}</CardContentText>
                                                    </Info>
                                                    <Line />
                                                </>
                                                :
                                                <>
                                                    <GroupInfo>
                                                        <GroupInfoColumn>
                                                            <Info>
                                                                <CardContentLabel>Group Name</CardContentLabel>
                                                                <CardContentText>{SampleData[0]['reschedule']['requestee']['name']}</CardContentText>
                                                            </Info>
                                                            <Info>
                                                                <CardContentLabel>Tags</CardContentLabel>
                                                                <CardContentText>{tags}</CardContentText>
                                                            </Info>
                                                            <Info>
                                                                <CardContentLabel>Group Size</CardContentLabel>
                                                                <CardContentText>{SampleData[0]['reschedule']['requestee']['size']}</CardContentText>
                                                            </Info>
                                                        </GroupInfoColumn>
                                                        <GroupInfoColumn>
                                                            <Info>
                                                                <CardContentLabel>Point Person</CardContentLabel>
                                                                <CardContentText>{SampleData[0]['reschedule']['requestee']['point_person']}</CardContentText>
                                                            </Info>
                                                            <Info>
                                                                <CardContentLabel>ID Number</CardContentLabel>
                                                                <CardContentText>{SampleData[0]['reschedule']['requestee']['id_number']}</CardContentText>
                                                            </Info>
                                                            <Info>
                                                                <CardContentLabel>Email Address</CardContentLabel>
                                                                <CardContentText>{SampleData[0]['reschedule']['requestee']['email']}</CardContentText>
                                                            </Info>
                                                        </GroupInfoColumn>
                                                    </GroupInfo>
                                                </>
                                            }
                                        </CardContentLeft>
                                        <CardContentRight>
                                            <FileContainer>
                                                <FileLabelWrapper>
                                                    <FileLabel>Download Attachment</FileLabel>
                                                </FileLabelWrapper>
                                                <FileFrame src={data && data.excuse_letter ? data.excuse_letter : "http://www.africau.edu/images/default/sample.pdf"} />
                                            </FileContainer>
                                        </CardContentRight>
                                    </CardContent>
                                    <CardContent>
                                        <CardContentLeft>
                                            <Info>
                                                <CardContentLabel>OR Number</CardContentLabel>
                                                <CardContentTextBold>{SampleData[0]['reschedule']['or_number']}</CardContentTextBold>
                                            </Info>
                                            <Info>
                                                <CardContentLabel>Payment Date</CardContentLabel>
                                                <CardContentTextBold>{payment_date}</CardContentTextBold>
                                            </Info>
                                        </CardContentLeft>
                                        <CardContentRight>
                                        {
                                            status && status.toLowerCase() == 'pending'
                                            ?
                                            <>
                                                <Info>
                                                    <CardContentLabel>Currently Reserved Slot</CardContentLabel>
                                                    <CardContentText>{formattedCurrentDate}<span style={{margin: "0 0.25rem"}} />{formattedCurrentTime}</CardContentText>
                                                </Info>
                                                <Info>
                                                    <CardContentLabel>Reason for Rescheduling</CardContentLabel>
                                                    <CardContentTextItalic>{data.reason}</CardContentTextItalic>
                                                </Info>
                                            </>
                                            :
                                            <CardContent>
                                                <CardContentLeft>
                                                    <Info>
                                                        <CardContentLabel>Currently Reserved Slot</CardContentLabel>
                                                        <CardContentText>{formattedCurrentDate}<span style={{margin: "0 0.25rem"}} />{formattedCurrentTime}</CardContentText>
                                                    </Info>
                                                    <Info>
                                                        <CardContentLabel>Reason for Rescheduling</CardContentLabel>
                                                        <CardContentTextItalic>{data.reason}</CardContentTextItalic>
                                                    </Info>
                                                </CardContentLeft>
                                                <CardContentRightCentered>
                                                    <Info>
                                                        <CardContentLabelGold>{status && status.toLowerCase() == 'approved' ? 'Approved' : 'Declined'} by</CardContentLabelGold>
                                                        <CardContentTextBold>{data.admin}</CardContentTextBold>
                                                        <CardContentText>{action_date}</CardContentText>
                                                    </Info>
                                                </CardContentRightCentered>
                                            </CardContent>
                                        }
                                        </CardContentRight>
                                    </CardContent>
                                </>
                            :
                                <Spinner />
                        }
                        {
                            status && status.toLowerCase() == 'pending'
                            ?
                            <>
                                <CardFooter>
                                    <CardButtons>
                                        <Button type="button" onClick={() => handleSubmit("declined")} reverse={true} label="Decline" />
                                        <Button type="button" onClick={() => handleSubmit("approved")} reverse={false} label="Approve" />
                                    </CardButtons>
                                </CardFooter>
                            </>
                            :
                            <></>
                        }
                    </RequestCard>
                    <RequestFooter>
                        <RequestFooterContent>
                            <RequestFooterText>AEGIS Yearbook Graduating Batch 2021</RequestFooterText>
                            <RequestFooterLink to="/">Settings</RequestFooterLink>
                        </RequestFooterContent>
                    </RequestFooter>
                </RequestContainer>
            </RequestSection>
        </>
    )
};

function SpecificRequest2() {
    let slug = useParams();

    const { data : allResched } = useQuery('allResched', {queryFn: ReschedulingRequestsDetail.index})
    const [singleResched, setSingleResched] = useState(false)
    console.log(singleResched)

    // Updates the data depending on the current slug
    useEffect(() => {
        ReschedulingRequestsDetail.getRequest(slug.id).then(json => {
            if (json === singleResched) return
            setSingleResched(json)
        })
    }, [singleResched])

    // Placeholder by getting highest id in sample data (replace with .length once integrated)
    let totalObjects, total;
    if (allResched) {
        totalObjects = parseInt(allResched.reduce(
            (max, data) => (data.id > max ? data.id : max),
            allResched[0].id
        ));
        total = totalObjects.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

    var nextSlug = useHistory();

    let date, status;
    if (singleResched) {
        date = format(parseISO(singleResched.date_submitted), "MMMM dd, yyyy  pp")
        status = String(singleResched.status);
    } 

    var payment_date = format(parseISO(SampleData[0]['reschedule']['payment_date']), "MMMM dd, yyyy  pp")
    var current_date = format(parseISO(SampleData[0]['reschedule']['current_date']), "MMMM dd, yyyy  p")
    var action_date = format(parseISO(SampleData[0]['reschedule']['admin_action']['action_date']), "MMMM dd, yyyy  pp")

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var tags = SampleData[0]['reschedule']['tags'].map(function(x){ return capitalizeFirstLetter(x); }).join(', ')

    function handlePrevArrowClick(e) {
        e.preventDefault();
        if (parseInt(slug.id) != 1) {
            var nextId = parseInt(slug.id) - 1;
            var url = '/rescheduling/' + String(nextId);
            nextSlug.push(url)
        }
    }

    function handleNextArrowClick(e) {
        e.preventDefault();
        if (parseInt(slug.id) < totalObjects) {
            var nextId = parseInt(slug.id) + 1;
            var url = '/rescheduling/' + String(nextId);
            nextSlug.push(url)
        }
    }

    return (
        <>
            <Section>
                    <Header dashboard={false} pageLabel="Rescheduling Requests" />
            </Section>
            {
                singleResched.id == slug.id
                ?
                <RequestSection>
                <RequestContainer>
                    <RequestNav>
                        <RequestNavLink to='/rescheduling/'>
                            <PrevArrow src={SmallLeftArrow} />
                            <ArrowLabel>Rescheduling Requests</ArrowLabel>
                        </RequestNavLink>
                        <RequestNavBtns>
                            <RequestNavBtnLabel>
                                Showing
                                <RequestNumber> Request # {slug.id} </RequestNumber>
                                of {total} results
                            </RequestNavBtnLabel>
                            <PrevLink to="/" onClick={handlePrevArrowClick}>
                                <PrevArrow src={LeftArrow} />
                            </PrevLink>
                            <NextLink to="/" onClick={handleNextArrowClick}>
                                <NextArrow src={RightArrow} />
                            </NextLink>
                        </RequestNavBtns>
                    </RequestNav>
                    <RequestCard>
                        <CardHeader>
                            <CardHeaderText>Request # {slug.id}</CardHeaderText>
                            <Status value={status} />
                        </CardHeader>
                        <CardContent>
                            <CardContentLeft>
                                <Info>
                                    <CardContentLabel>Date of Request</CardContentLabel>
                                    <CardContentText>{date}</CardContentText>
                                </Info>
                                {
                                    singleResched.photoshoot.photoshoot_type == "Individual"
                                    ?
                                    <>
                                        <Info>
                                            <CardContentLabel>Student Name</CardContentLabel>
                                            <CardContentText>{singleResched.photoshoot.individual_photoshoot.name}</CardContentText>
                                        </Info>
                                        <Info>
                                            <CardContentLabel>ID Number</CardContentLabel>
                                            <CardContentText>{singleResched.photoshoot.individual_photoshoot.id_number}</CardContentText>
                                        </Info>
                                        <Info>
                                            <CardContentLabel>Tags</CardContentLabel>
                                            <CardContentText>{tags}</CardContentText>
                                        </Info>
                                        <Info>
                                            <CardContentLabel>Email Address</CardContentLabel>
                                            <CardContentText>{singleResched.photoshoot.individual_photoshoot.email}</CardContentText>
                                        </Info>
                                        <Line />
                                    </>
                                    :
                                    <>
                                        <GroupInfo>
                                            <GroupInfoColumn>
                                                <Info>
                                                    <CardContentLabel>Group Name</CardContentLabel>
                                                    <CardContentText>{singleResched.photoshoot.group_photoshoot.name}</CardContentText>
                                                </Info>
                                                <Info>
                                                    <CardContentLabel>Tags</CardContentLabel>
                                                    <CardContentText>{tags}</CardContentText>
                                                </Info>
                                                <Info>
                                                    <CardContentLabel>Group Size</CardContentLabel>
                                                    <CardContentText>{singleResched.photoshoot.group_photoshoot.size}</CardContentText>
                                                </Info>
                                            </GroupInfoColumn>
                                            <GroupInfoColumn>
                                                <Info>
                                                    <CardContentLabel>Point Person</CardContentLabel>
                                                    <CardContentText>{singleResched.photoshoot.group_photoshoot.emergency_contact_name}</CardContentText>
                                                </Info>
                                                <Info>
                                                    <CardContentLabel>ID Number</CardContentLabel>
                                                    <CardContentText>{SampleData[0]['reschedule']['requestee']['id_number']}</CardContentText>
                                                </Info>
                                                <Info>
                                                    <CardContentLabel>Email Address</CardContentLabel>
                                                    <CardContentText>{singleResched.photoshoot.group_photoshoot.emergency_contact_email}</CardContentText>
                                                </Info>
                                            </GroupInfoColumn>
                                        </GroupInfo>
                                    </>
                                }
                            </CardContentLeft>
                            <CardContentRight>
                                <FileContainer>
                                    <FileLabelWrapper>
                                        <FileLabel>Download Attachment</FileLabel>
                                    </FileLabelWrapper>
                                    <FileFrame src={singleResched && singleResched.excuse_letter ? singleResched.excuse_letter : "http://www.africau.edu/images/default/sample.pdf"} />
                                </FileContainer>
                            </CardContentRight>
                        </CardContent>
                        <CardContent>
                            <CardContentLeft>
                                <Info>
                                    <CardContentLabel>OR Number</CardContentLabel>
                                    <CardContentTextBold>{SampleData[0]['reschedule']['or_number']}</CardContentTextBold>
                                </Info>
                                <Info>
                                    <CardContentLabel>Payment Date</CardContentLabel>
                                    <CardContentTextBold>{payment_date}</CardContentTextBold>
                                </Info>
                            </CardContentLeft>
                            <CardContentRight>
                            {
                                status.toLowerCase() == 'pending'
                                ?
                                <>
                                    <Info>
                                        <CardContentLabel>Currently Reserved Slot</CardContentLabel>
                                        <CardContentText>{current_date}</CardContentText>
                                    </Info>
                                    <Info>
                                        <CardContentLabel>Reason for Rescheduling</CardContentLabel>
                                        <CardContentTextItalic>{singleResched.reason}</CardContentTextItalic>
                                    </Info>
                                </>
                                :
                                <CardContent>
                                    <CardContentLeft>
                                        <Info>
                                            <CardContentLabel>Currently Reserved Slot</CardContentLabel>
                                            <CardContentText>{current_date}</CardContentText>
                                        </Info>
                                        <Info>
                                            <CardContentLabel>Reason for Rescheduling</CardContentLabel>
                                            <CardContentTextItalic>{singleResched.reason}</CardContentTextItalic>
                                        </Info>
                                    </CardContentLeft>
                                    <CardContentRightCentered>
                                        <Info>
                                            <CardContentLabelGold>{status.toLowerCase() == 'approved' ? 'Approved' : 'Declined'} by</CardContentLabelGold>
                                            <CardContentTextBold>{SampleData[0]['reschedule']['admin_action']['admin_name']}</CardContentTextBold>
                                            <CardContentText>{action_date}</CardContentText>
                                        </Info>
                                    </CardContentRightCentered>
                                </CardContent>
                            }
                            </CardContentRight>
                        </CardContent>
                        {
                            status.toLowerCase() == 'pending'
                            ?
                            <>
                                <CardFooter>
                                    <CardButtons>
                                        <Button type="button" onClick={handleNextArrowClick} reverse={true} label="Decline" />
                                        <Button type="button" onClick={handleNextArrowClick} reverse={false} label="Approve" />
                                    </CardButtons>
                                </CardFooter>
                            </>
                            :
                            <></>
                        }
                    </RequestCard>
                    <RequestFooter>
                        <RequestFooterContent>
                            <RequestFooterText>AEGIS Yearbook Graduating Batch 2021</RequestFooterText>
                            <RequestFooterLink to="/">Settings</RequestFooterLink>
                        </RequestFooterContent>
                    </RequestFooter>
                </RequestContainer>
            </RequestSection>
            :
                <Spinner/>
            }
            
        </>
    )
};

export default SpecificRequest2;