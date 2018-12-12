import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "components";

import userBackground from "assets/img/bg5.jpg";
import userAvatar from "assets/img/mike.jpg";

class NovaDoacao extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Nova Doação</h5>
                </CardHeader>
                <CardBody>
                  <form>

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome do Remédio",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Tamanho",
                          inputProps: {
                            type: "number",
                            placeholder: "",
                            defaultValue: ""
                          }
                        },
                        {
                          label: "Quantidade",
                          inputProps: {
                            type: "number",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome do Médico",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />
                  </form>

                  <Button color="danger" className="float-left" href="/doacoes">Cancelar</Button>
                  <Button color="info" className="float-right" href="/doacoes">Salvar</Button>
                  
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </div>
    );
  }
}

export default NovaDoacao;
