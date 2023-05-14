import React from 'react'
import { useRelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import { Box, Typography } from '@mui/material';
import RelatedProductCard from './RelatedProductCard';


const recommendClient = recommend('UA0B0CAN82', 'a15be29c0fcc61f2dd0ff51dc5877c71');
const indexName = 'products';

const RelatedProduct = ({ product }) => {

    const { recommendations } = useRelatedProducts({
        recommendClient,
        indexName,
        objectIDs: [product._id],
        maxRecommendations: 5
    });

    return (
        <>
            <Typography variant='h5'>Related Products</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {recommendations.map((item) => (
                    <RelatedProductCard product={item} />
                ))}
            </Box>
        </>
    )
}

export default RelatedProduct