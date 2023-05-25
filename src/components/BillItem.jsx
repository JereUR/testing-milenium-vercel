import React, { useState } from "react";
import styled from "styled-components";
import { GrDocumentPdf } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  usePDF,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import logo from "../assets/logo.png";
import seal from "../assets/payment-seal.png";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/Fonts";
import { useEffect } from "react";

const { primaryBlue, secondaryBlue, colorText } = Colors;

export const BillItem = ({ bill, user, months }) => {
  const [viewPdf, setViewPdf] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(windowWidth < 800);
  const month = months.find((m) => m.value === bill.month).month;
  const [doc, setDoc] = useState(null);
  const [instance, updateInstance] = usePDF({ document: doc });

  useEffect(() => {
    if (user) {
      const newDoc = (
        <Document>
          <Page
            size="A5"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                textAlign: "center",
                backgroundColor: "white",
                padding: 1,
              }}
            >
              <Image
                src={logo}
                alt="random image"
                style={{ maxWidth: "150px", maxHeight: "auto", top: "-10vw" }}
              />
              <Text
                style={{
                  color: `${primaryBlue}`,
                  fontSize: "36px",
                  alignItems: "center",
                  margin: "auto auto 10vw auto",
                  fontWeight: "bold",
                }}
              >
                Pago {month} - {bill.year}
              </Text>

              <Text style={{ textAlign: "justify", marginTop: "30px" }}>
                Usuario: {user.username} {user.surname}.
              </Text>
              <Text style={{ textAlign: "justify", marginTop: "30px" }}>
                Email: {user.email}.
              </Text>
              <Text style={{ textAlign: "justify", marginTop: "30px" }}>
                Fecha: {bill.day} de {month} del {bill.year}.
              </Text>
              <Text style={{ textAlign: "justify", marginTop: "30px" }}>
                Monto: ${bill.mount}.
              </Text>
              <Image
                src={seal}
                alt="random image"
                style={{
                  maxWidth: "120px",
                  maxHeight: "120px",
                  marginLeft: "60%",
                  top: "10vw",
                  transform: "rotate(-15)",
                }}
              />
            </View>
          </Page>
        </Document>
      );
      setDoc(newDoc);
    }
  }, [user, bill, month]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobile(windowWidth < 800);
  }, [windowWidth]);

  const handlePdf = () => {
    updateInstance({ document: doc });
    setViewPdf(!viewPdf);
  };

  return (
    <Container>
      <BillItemContainer>
        <Namebill>
          <GrDocumentPdf size="1.5rem" />
          Pago {month} - {bill.year}
        </Namebill>
        {!mobile ? (
          <BillButton type="button" onClick={handlePdf}>
            {viewPdf ? "X" : "Ver/Descargar PDF"}
          </BillButton>
        ) : (
          <DownloadButton>
            <PDFDownloadLink
              document={doc}
              fileName={`Pago ${month} ${bill.year} - ${user.first_name} ${user.last_name}`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Cargando documento..." : <FiDownload />
              }
            </PDFDownloadLink>
          </DownloadButton>
        )}
      </BillItemContainer>
      {viewPdf && (
        <PdfContainer>
          <Pdf src={instance.url} type="application/pdf"></Pdf>
        </PdfContainer>
      )}
    </Container>
  );
};

const BillButton = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.3rem;
  padding: 10px 20px;
  margin: 1vw 1vw 1vw 0;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 980px) {
    font-size: 0.9rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`;

const BillItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colorText};
  margin: 2vw 5vw 1vw 5vw;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px #ccc;

  @media screen and (max-width: 480px) {
    margin: 8vw 1vw 5vw 1vw;
  }
`;

const Container = styled.div``;

const DownloadButton = styled.div`
  margin: 3vw 2vw 0vw 0vw;

  @media screen and (max-width: 480px) {
    margin: 5vw 1vw 0vw 0vw;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const Namebill = styled.p`
  font-size: 1.3rem;

  @media screen and (max-width: 800px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const Pdf = styled.embed`
  width: 50vw;
  height: 25vw;

  @media screen and (max-width: 1400px) {
    width: 60vw;
    height: 30vw;
  }

  @media screen and (max-width: 930px) {
    width: 70vw;
    height: 35vw;
  }
`;

const PdfContainer = styled.div`
  text-align: center;
`;
