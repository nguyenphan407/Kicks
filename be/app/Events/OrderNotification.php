<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $order;
    public $connection = 'redis';

    public $queue = 'default';

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function broadcastOn()
    {
        return [
            new Channel('orders'),
        ];  // Kênh 'messages'
    }

    public function broadcastAs()
    {
        return 'OrderNotification';  // Tên sự kiện
    }

    public function broadcastWith()
    {
        return ["order" => $this->order];
    }
}
