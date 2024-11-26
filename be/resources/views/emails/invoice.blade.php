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

    </style>
</head>
<body>
    <div class="invoice-container" style="
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        ">
        <div class="invoice-header" style="
            margin-bottom: 30px;
        ">
            <div class="invoice-number" style="
                color: #333;
                font-size: 1.2em;
                margin-bottom: 10px;
            ">INV{{ $invoice['invoice_id'] }}</div>
            
            <div class="flex-container" style="
                display: inLine;
            ">
                <div class="info-group" style="
                    margin: 0;
                    padding: 0;
                    flex-shrink: 0; /* Không cho phép thu nhỏ */
                ">
                    <h2 style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Due date</h2>
                    <p style="margin: 0; font-size: 1em;">{{(new DateTime($invoice['due_date']))->format('d F Y')}}</p>
                </div>
                <div class="info-group" align ="right">
                    <h2 style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Subject</h2>
                    <p style="margin: 0; font-size: 1em;">{{ $invoice['subject'] }}</p>
                </div>
            </div>

            
            <div class="flex-container" style="
                display: inLine;
                margin-bottom: 10px;
            ">
                <div class="info-group" style="margin-bottom: 20px;">
                    <h2 style="
                        color: #666;
                        font-size: 0.9em;
                        margin-bottom: 5px;    
                    ">Billed to</h2>
                    <p style="
                        margin: 0;
                        font-size: 1em;
                    ">{{ $invoice['customer_name'] }}</p>
                    <p style="
                        margin: 0;
                        font-size: 1em;
                    ">{{ $invoice['customer_email'] }}</p>
                </div>
                <div class="info-group" align ="right">
                    <h2 style="
                        color: #666;
                        font-size: 0.9em;
                        margin-bottom: 5px;    
                    " >Currency</h2>
                    <p style="
                        margin: 0;
                        font-size: 1em;
                    ">{{ $invoice['currency'] }}</p>
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
                @foreach($invoice['items'] as $item)
                <tr>
                    <td>
                        <div style="display: flex; align-items: center;">
                            @if($item->image)
                            <img src="{{ $item->image }}" alt="{{ $item->name }}" class="product-image"
                                style="
                                    width: 40px;
                                    height: 40px;
                                    object-fit: cover;
                                    border-radius: 4px;
                                "
                            >
                            @endif
                            <span style="margin-left: 10px">{{ $item->name }}</span>
                        </div>
                    </td>
                    <td>{{ $item->quantity }}</td>
                    <td>${{ ($item->price) }}</td>
                    <td>${{ number_format($item->price) * $item->quantity}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <table class="amount-table" style="
            width: 300px;
            margin-left: auto;
        ">
            <tr>
                <td style="
                    padding: 8px 12px;    
                ">Subtotal</td>
                <td style="
                    padding: 8px 12px;    
                " align="right">${{ number_format($invoice['subtotal']) }}</td>
            </tr>
            <tr>
                <td style="
                    padding: 8px 12px;    
                ">Discount 0%</td>
                <td style="
                   padding: 8px 12px;    
                " align="right">$0</td>
            </tr>      
            <tr style="font-weight: bold;">
                <td style="
                    padding: 8px 12px;    
                ">Total</td>
                <td style="
                    padding: 8px 12px;    
                " align="right">${{ number_format($invoice['total']) }}</td>
            </tr>
        </table>

        {{-- @if($invoice['attachment'])
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
        @endif --}}
    </div>
</body>
</html>