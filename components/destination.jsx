import toSlugCase from 'to-slug-case';
import Link from 'next/link';
import toTitleCase from 'to-title-case';
import uniqueBy from 'unique-by';
import '../styles/destinasi.scss';

// icons 
import {
    LocationIcon,
} from './icons';

// react bootstrap components
import {
    Card,
    Col,
    Row,
} from 'react-bootstrap';

const dataJson = require('../data.json');
const dataPremium = require('../premium-itinerary.json');
const data = [ ...uniqueBy(dataJson, 'ikonik'), ...dataPremium ];

function Cards({ offset = 0, limit = data.length }) {

    return data.slice(offset, limit).map(({ ikonik, foto, is_free }) => (
        <Col className="place__destination mb-4" xs={12} sm={6} md={4} key={ikonik}>
            <Card className="place__card">
                <Link href={`/destinasi/${toSlugCase(ikonik)}`}>
                    <a className={[ is_free && "place__link-img--is-free", "place__link-img"].join(' ')}>
                        <Card.Img
                            className="place__img"
                            variant="top"
                            src={ is_free ? foto : foto.split(';')[0] } alt={ikonik} 
                        />
                    </a>
                </Link>
                <Card.Body className="place__card--body">
                    <Card.Title className="place__name d-flex align-items-center mb-0">
                        <LocationIcon />
                        <span>&nbsp;</span>

                        <Link href={`/destinasi/${toSlugCase(ikonik)}`}>
                            <a className="place__text-truncate" title={toTitleCase(ikonik)}>{ toTitleCase(ikonik) }</a>
                        </Link>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ));
}

function Destination(props) {
    return (
        <Row className="my-2 my-md-0"> 
            <Cards {...props} /> 
        </Row>
    );
}

export default Destination;
