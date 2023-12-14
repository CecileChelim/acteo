import React, { useState } from "react";
import {
    Container, Row, Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Offcanvas, Card, ListGroup, ListGroupItem
} from "reactstrap";
import { TitlePage, TitlePageApp } from "../style/Layout";
import { DropdownPrimary } from "../style/Button";
import TimelineListItem from "../components/TimelineListItem";
import CardHelp from "../components/CardHelp";
import styled from "styled-components";
import moment from "moment";

const DerniereActivite = styled(Card)`
  background-color:#00A18E;
  padding:1rem;
  border:0;
  ul.list-group{
    background-color:transparent;
    li.list-group-item{
        background-color:transparent;
    border: 0;
    color: #fff;
    font-weight:600;
    display: flex;
    justify-content: space-between;
    span{font-weight:400;}
    }
}
margin-bottom:2rem;
`;


function Dashboard(args) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [canvas, setCanvas] = useState(false);
    const toggle2 = () => setCanvas(!canvas);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <>
            <Container>
                <Row className="d-flex align-self-start">
                    <TitlePageApp>
                        <Col md="7">
                            <TitlePage>Voici l'avancement de votre dossier <span role="img" aria-label="bottom">👇</span> </TitlePage>
                        </Col>
                        <Col md="5" className="text-end">
                            <DropdownPrimary isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret>Actions rapides</DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem onClick={toggle2}>+ Ajouter un document</DropdownItem>
                                    <DropdownItem>Posez une question</DropdownItem>
                                    <DropdownItem>Quo Action</DropdownItem>
                                </DropdownMenu>
                            </DropdownPrimary>
                        </Col>
                    </TitlePageApp>
                    <Col md="7" className="mt-3">
                        {/* Composant offre d'achat */}
                        {args.evenement[0].fields.etat === "fait" ? (
                            <TimelineListItem etat={args.evenement[0].fields.etat} type={args.evenement[0].fields.type} message={args.evenement[0].fields.message} contenu={args.evenement[0].fields.contenu} action="telecharger" lienDoc={args.evenement[0].fields.document_from_document[0].url} />
                        ) : (<>{" "}</>)}
                        {args.evenement[0].fields.etat === "en cours" ? (
                            <TimelineListItem etat={args.evenement[0].fields.etat} type={args.evenement[0].fields.type} message={args.evenement[0].fields.message} contenu={args.evenement[0].fields.contenu} action="ajouterDoc" />
                        ) : (<>{" "}</>)}
                        <br />

                        {/* Composant compromis de vente */}
                        {args.evenement[1].fields.etat === "pas fait" ? (
                            <TimelineListItem etat={args.evenement[1].fields.etat} type={args.evenement[1].fields.type} message={args.evenement[1].fields.message} contenu={args.evenement[1].fields.contenu} action="ensavoirplusCompromis" />
                        ) : (<>{" "}</>)}

                        {/* 2 états pour en cours, un sans action et l'autre avec action "Voir et signer" + lien de signature A DÉTERMINER*/}
                        {args.evenement[1].fields.etat === "en cours" ? (
                            <TimelineListItem etat={args.evenement[1].fields.etat} type={args.evenement[1].fields.type} message={args.evenement[1].fields.message} contenu={args.evenement[1].fields.contenu} />
                        ) : (<>{" "}</>)}

                        {args.evenement[1].fields.etat === "a signer" ? (
                            <TimelineListItem etat={args.evenement[1].fields.etat} type={args.evenement[1].fields.type} message={args.evenement[1].fields.message} contenu={args.evenement[1].fields.contenu} action="Voiretsigner" lienSignaure="#" />
                        ) : (<>{" "}</>)}

                        {args.evenement[1].fields.etat === "information(s) manquante(s)" ? (
                            <TimelineListItem etatcss="infoManquantes" etat={args.evenement[1].fields.etat} type={args.evenement[1].fields.type} message={args.evenement[1].fields.message} contenu={args.evenement[1].fields.contenu} action="Contacter" />
                        ) : (<>{" "}</>)}

                        {args.evenement[1].fields.etat === "fait" ? (
                            <TimelineListItem etat={args.evenement[1].fields.etat} type={args.evenement[1].fields.type} message={args.evenement[1].fields.message} contenu={args.evenement[1].fields.contenu} action="telecharger" lienDoc={args.evenement[1].fields.document_from_document[0].url} />
                        ) : (<>{" "}</>)}
                        <br />
                        {/* Composant acte de vente */}
                        {args.evenement[2].fields.etat === "pas fait" ? (
                            <TimelineListItem etat={args.evenement[2].fields.etat} type={args.evenement[2].fields.type} message={args.evenement[2].fields.message} contenu={args.evenement[2].fields.contenu} action="ensavoirplusActe" />
                        ) : (<>{" "}</>)}

                        {/* 2 états pour en cours, un sans action et l'autre avec action "Indiquez vos dispo" + lien doodle*/}
                        {args.evenement[2].fields.etat === "en cours" ? (
                            <TimelineListItem etat={args.evenement[2].fields.etat} type={args.evenement[2].fields.type} message={args.evenement[2].fields.message} contenu={args.evenement[2].fields.contenu} action="rdvActe" lienDoodle={args.evenement[2].fields.lien_doodle} />
                        ) : (<>{" "}</>)}
                    </Col>
                    <Col md="5" className="mt-3">
                        <h6>Dernières activités</h6>
                        <DerniereActivite>
                            <ListGroup>
                                {args.activite.map((col, i) => (
                                    <>
                                        <ListGroupItem>
                                            {args.activite[i].fields.message} <span> {moment(args.activite[i].fields.date).format('DD/MM/YYYY')}</span>
                                        </ListGroupItem>
                                    </>
                                ))}


                            </ListGroup>
                        </DerniereActivite>
                        <CardHelp />
                    </Col>

                </Row>
            </Container>
            <Offcanvas
                isOpen={canvas}
                toggle={toggle2}
                {...args}
                direction="end"
                scrollable></Offcanvas>
        </>
    );
}

export default Dashboard;