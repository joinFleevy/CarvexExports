import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Ultimate | Vehicles — Cars & Products',
  description: 'Explore and rent premium vehicles with real-time availability and transparent pricing.',
};

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
