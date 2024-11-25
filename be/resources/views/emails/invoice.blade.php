<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .invoice-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .invoice-header {
            margin-bottom: 30px;
        }
        .invoice-number {
            color: #333;
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .flex-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .info-group {
            margin-bottom: 20px;
        }
        .info-group h2 {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 5px;
        }
        .info-group p {
            margin: 0;
            font-size: 1em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background: #f8f9fa;
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid #dee2e6;
            color: #666;
            font-size: 0.9em;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
        }
        .product-image {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 4px;
        }
        .amount-table {
            width: 300px;
            margin-left: auto;
        }
        .amount-table td {
            padding: 8px 12px;
        }
        .amount-table tr:last-child {
            font-weight: bold;
        }
        .attachment-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }
        .attachment-box {
            display: flex;
            align-items: center;
            padding: 10px;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            width: fit-content;
        }
        .attachment-icon {
            margin-right: 10px;
        }
        .download-link {
            color: #007bff;
            text-decoration: none;
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <div class="invoice-number">INV{{ $invoice->number }}</div>
            
            <div class="flex-container">
                <div class="info-group">
                    <h2>Due date</h2>
                    <p>{{ $invoice->due_date->format('d F Y') }}</p>
                </div>
                <div class="info-group">
                    <h2>Subject</h2>
                    <p>{{ $invoice->subject }}</p>
                </div>
            </div>
            
            <div class="flex-container">
                <div class="info-group">
                    <h2>Billed to</h2>
                    <p>{{ $invoice->client_name }}</p>
                    <p>{{ $invoice->client_email }}</p>
                </div>
                <div class="info-group">
                    <h2>Currency</h2>
                    <p>{{ $invoice->currency }}</p>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                    <th>UNIT PRICE</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                <tr>
                    <td>
                        <div style="display: flex; align-items: center;">
                            @if($item->image)
                            <img src="{{ $item->image }}" alt="{{ $item->description }}" class="product-image">
                            @endif
                            <span style="margin-left: 10px">{{ $item->description }}</span>
                        </div>
                    </td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->unit_price) }} {{ $invoice->currency }}</td>
                    <td>{{ number_format($item->amount) }} {{ $invoice->currency }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <table class="amount-table">
            <tr>
                <td>Subtotal</td>
                <td align="right">{{ number_format($invoice->subtotal) }} {{ $invoice->currency }}</td>
            </tr>
            <tr>
                <td>Discount {{ $invoice->discount_percentage }}%</td>
                <td align="right">{{ number_format($invoice->discount_amount) }} {{ $invoice->currency }}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td align="right">{{ number_format($invoice->total) }} {{ $invoice->currency }}</td>
            </tr>
            <tr>
                <td>Amount due</td>
                <td align="right">{{ number_format($invoice->amount_due) }} {{ $invoice->currency }}</td>
            </tr>
        </table>

        @if($invoice->attachment)
        <div class="attachment-section">
            <h2>Attachment</h2>
            <div class="attachment-box">
                <div class="attachment-icon">📎</div>
                <div>
                    <div>{{ $invoice->attachment_name }}</div>
                    <div style="color: #666; font-size: 0.9em;">{{ $invoice->attachment_size }}</div>
                </div>
                <a href="{{ $invoice->attachment_url }}" class="download-link">Download ↓</a>
            </div>
        </div>
        @endif
    </div>
</body>
</html>