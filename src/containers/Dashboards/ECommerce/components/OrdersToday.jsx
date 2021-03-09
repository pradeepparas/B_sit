import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col } from 'reactstrap';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
} from 'recharts';
import TrendingDownIcon from 'mdi-react/TrendingDownIcon';

const data = [
  { name: 'Page A', pv: 255 },
  { name: 'Page B', pv: 452 },
  { name: 'Page C', pv: 154 },
  { name: 'Page D', pv: 85 },
  { name: 'Page E', pv: 545 },
  { name: 'Page F', pv: 438 },
  { name: 'Page G', pv: 523 },
  { name: 'Page H', pv: 226 },
  { name: 'Page I', pv: 112 },
  { name: 'Page J', pv: 101 },
];

const OrdersToday = () => {
  const { t } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = (item) => {
    const index = data.indexOf(item.payload);
    setActiveIndex(index);
  };

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__card-widget">
          <div className="card__title">
            <h5 className="bold-text">{t('dashboard_commerce.orders_today')}</h5>
          </div>
          <div className="dashboard__total">
            <TrendingDownIcon className="dashboard__trend-icon" />
            <p className="dashboard__total-stat">
              {(activeItem.pv)}
            </p>
            <div className="dashboard__chart-container">
              <ResponsiveContainer height={50}>
                <BarChart data={data}>
                  <Bar dataKey="pv" onClick={handleClick}>
                    {data.map((entry, index) => (
                      <Cell
                        cursor="pointer"
                        fill={index === activeIndex ? '#4ce1b6' : '#c88ffa'}
                        key={`cell-${index}`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OrdersToday;
