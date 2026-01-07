import Link from 'next/link';
import { getResaleDataForTown } from '@/lib/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export async function PriceTrends({ town }: { town: string }) {
  const data = await getResaleDataForTown(town);

  return (
    <Card className="animate-fade-in-delay-2">
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions in {town}</CardTitle>
        <CardDescription>Showing up to 50 of the latest resale listings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Street</TableHead>
                    <TableHead>Flat Type</TableHead>
                    <TableHead>Floor Area (sqm)</TableHead>
                    <TableHead className="text-right">Resale Price</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.length > 0 ? (
                    data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.street_name}, Blk {item.block}</TableCell>
                        <TableCell>{item.flat_type}</TableCell>
                        <TableCell>{item.floor_area_sqm}</TableCell>
                        <TableCell className="text-right font-semibold">
                            ${item.resale_price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                            <Link href={`/listings/${item.id}`} className="text-primary hover:underline">
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                            No data available for this town.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
