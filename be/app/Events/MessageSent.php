<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public $connection = 'redis';

    public $queue = 'default';

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return [
            new Channel('messages'),
        ];  // Kênh 'messages'
    }

    public function broadcastAs()
    {
        return 'MessageSent';  // Tên sự kiện
    }

    public function broadcastWith()
    {
        return ["message" => $this->message];
    }
}

