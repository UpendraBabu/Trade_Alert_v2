import { Container, Stack } from "@mui/material";
import "./shimmer_style.css";

export default function ShimmerLoder() {
    return (
        <Stack className="shimmer-wrapper" style={{}}>
            <Container className="shimmer-row" >
                <Container className="shimmer-title shimmer" />
                <Container className="shimmer-cell shimmer" />
                <Container className="shimmer-cell shimmer" />
                <Container className="shimmer-cell shimmer" />
                <Container className="shimmer-cell shimmer" />
                <Container className="shimmer-cell shimmer" />
            </Container>

        </Stack>
    );
}